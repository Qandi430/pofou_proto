import React, { createContext, Component } from 'react';
import { getMemberByMemberNumber, login, logout } from '../server/member/MemberServer';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookies';
import publicIp from 'react-public-ip';
import { getQuery } from '../components/common/CommonScript';
import { debounce } from 'lodash-es';

const Context  = createContext();

const {Provider,Consumer : CommonConsumer} = Context;

class CommonProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            loginMember : {
                memberNumber : "",
                email : "",
                memberType : "",
            },
            openSpinnerModal : false,
            openLoginNoticeModal : false,
        };
    }

    componentDidMount(){
        let memberToken;
        let query = getQuery();
        let logout = query.logout !== undefined;
        if(query.memberToken !== undefined){
            memberToken = query(memberToken);
        }else{
            memberToken = cookie.load("memberToken");
        }

        if(logout){
            this.loginAction();
        }else if(memberToken){
            this.setMember(memberToken);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        let memberToken = cookie.load("memberToken");
        
        if(memberToken !== undefined){
            const member = jwtDecode(memberToken).member;
            
            if(member.memberType === "none" && this.props.history.location.pathname.indexOf("/auth/selectMemberType") < 0){
                this.props.history.push("/auth/selectMemberType");
            }

            if(this.props.location.pathname !== prevProps.location.pathname){
                this.resetMemberInfo(member.memberNumber);
            }
        }
    }

    actions = {
        loginAction : (email,password) => this.loginAction(email,password),        
        logoutAction : () => this.logoutAction(),
        setMember : token => this.setMember(token),
        toggleSpinnerModal : status => this.toggleSpinnerModal(status),
        resetMemberInfo : memberNumber => this.resetMemberInfo(memberNumber),
        toggleLoginNoticeModal : () => this.toggleLoginNoticeModal(),
    };

    //login action
    loginAction = async(email,password) => {
        this.toggleSpinnerModal(true);
        const {data}  = await login(email,password);
        if(data.result === "fail"){
            alert(data.reason);
        }else{
            await this.setMember(data.token);
            if(this.state.loginMember.memberType === "none"){
                // window.location.href = "";
                this.props.history.push("/auth/selectMemberType");
            }else{
                // window.location.href = "/";
                this.props.history.push("/");
            }
        }
        this.toggleSpinnerModal(false);
    }

    setMember = async (token) => {
        let loginMember = jwtDecode(token);
        let expires = new Date();
        expires.setHours(expires.getHours() + 2);
        cookie.save("memberToken",token,{path:"/",expires:expires});
        const ipv4 = await publicIp.v4();

        await this.setState({
            isLogin : true,
            loginMember : {
                ...loginMember.member,
                ipAddress : ipv4
            }
        });
    }

    logoutAction = async () => {
        await logout();

        cookie.remove("memberToken",{path:"/"});
        this.setState({
            loginMember : {
                memberNumber : "",
                email : "",
                memberType : "",
            },
            isLogin : false,
        });

        if(this.props.history.location.pathname !==  "/"){
            this.props.history.push("/");
        }
    }

    toggleSpinnerModal = (status) => {
        console.log(status);
        if(status === undefined){
            this.setState({
                ...this.state,
                openSpinnerModal : !this.state.openSpinnerModal
            })
        }else{
            this.setState({
                ...this.state,
                openSpinnerModal : status
            })
        }
    }
    // toggleSpinnerModal = debounce(this.toggleSpinnerModal,500);

    resetMemberInfo = async (memberNumber) => {
        console.log("resetMemberInfo")
        const {data : memberInfo} = await getMemberByMemberNumber(memberNumber);
        let loginMember = jwtDecode(memberInfo);
        let expires = new Date();
        expires.setHours(expires.getHours() + 2);
        cookie.save("memberToken",memberInfo,{path:"/",expires:expires});
        const ipv4 = await publicIp.v4();

        await this.setState({
            isLogin : true,
            loginMember : {
                ...loginMember.member,
                ipAddress : ipv4
            }
        });
    }
    
    toggleLoginNoticeModal = () => {
        console.log("???")
        this.setState({
            ...this.state,
            openLoginNoticeModal : !this.state.openLoginNoticeModal
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.history !== undefined) {
            if(prevState.history === undefined || nextProps.history.location.pathname !== prevState.history.location.pathname){
                return { history: nextProps.history };      
            }
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
    }
    

    render(){
        const {state,actions} = this;
        const value = {state,actions};
        
        return(
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

function createCommonConsumer(WrappedComponent){
    return function UseCommonConsumer(props){
        return(
            <CommonConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            history = {state.history}
                            isLogin = {state.isLogin}
                            loginAction = {actions.loginAction}
                            logoutAction = {actions.logoutAction}
                            loginMember = {state.loginMember}
                            setMember = {actions.setMember}
                            openSpinnerModal = {state.openSpinnerModal}
                            toggleSpinnerModal = {actions.toggleSpinnerModal}
                            resetMemberInfo = {actions.resetMemberInfo}
                            openLoginNoticeModal = {state.openLoginNoticeModal}
                            toggleLoginNoticeModal = {actions.toggleLoginNoticeModal}
                            {...props}
                        />
                    )
                }
            </CommonConsumer>
        )
    }
}

export{
    CommonProvider,
    CommonConsumer,
    createCommonConsumer,
}