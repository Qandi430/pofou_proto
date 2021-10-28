import React, { createContext, Component } from 'react';
import { login, logout } from '../server/member/MemberServer';
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

    actions = {
        loginAction : (email,password) => this.loginAction(email,password),        
        logoutAction : () => this.logoutAction(),
        setMember : token => this.setMember(token),
        toggleSpinnerModal : status => this.toggleSpinnerModal(status),
    };

    //login action
    loginAction = async(email,password) => {
        this.toggleSpinnerModal(true);
        console.log(email,password);
        const {data}  = await login(email,password);
        console.log(data);
        if(data.result === "fail"){
            alert(data.reason);
        }else{
            await this.setMember(data.token);
            console.log(this.state.loginMember);
            if(this.state.loginMember.memberType === "none"){
                // window.location.href = "";
                this.props.history.push("/auth/selectMemberType");
            }else{
                // window.location.href = "/";
                this.props.history.push("/");
            }
        }
        this.toggleSpinnerModal(false);
        // this.setState({
        //     isLogin : true
        // });
        // console.log("loginAction true")
        // window.history.back();
    }

    setMember = async (token) => {
        let loginMember = jwtDecode(token);
        let expires = new Date();
        expires.setHours(expires.getHours() + 2);
        cookie.save("memberToken",token,{path:"/",expires:expires});
        const ipv4 = await publicIp.v4();

        this.setState({
            isLogin : true,
            loginMember : {
                ...loginMember.member,
                ipAddress : ipv4
            }
        })
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
        })
    }

    toggleSpinnerModal = (status) => {
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
    toggleSpinnerModal = debounce(this.toggleSpinnerModal,500);

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