import React, { createContext, Component } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getWorkList } from '../server/main/MainServer';
import { deleteLike, getWorkByWorkNumber, getWorkDetail, insertLike } from '../server/work/WorkServer';
import {getCategoryCodeList} from '../server/common/CommonServer';

const Context  = createContext();

const {Provider,Consumer : MainConsumer} = Context;

class MainProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginMember : null,
            pageNo : 1,
            workList : [],
            openSpinnerModal : false,
            workDetail : {
                memberNumber : "",
                profileImage : "",
                workNumber : "",
                title : "",
                backgroundColor : "#FFFFFF",
                margin : 0,
                thumbnail : "",
                category1 : "",
                category2 : "",
                tag : "",
                copyright : "",
                status : "",
                linkList : [],
                contentsList : [
                    
                ],
            },
            openWorkDetailModal : false,
            keywordList : [],
        };
    }

    componentDidMount(prevProps,prevState){
        // const urlSeparte = this.props.history.location.pathname.split("/");
        const memberToken = cookie.load("memberToken");
        
        if(memberToken !== undefined){
            const loginMember = jwtDecode(memberToken);
            this.setState({
                ...this.state,
                loginMember : loginMember.member
            })
        }
        if(this.state.keywordList.length === 0){
            this.setKeywordList();
        }
        this.setWorkList();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.loginMember === null){
            const memberToken = cookie.load("memberToken");
            
            if(memberToken !== undefined){
                const loginMember = jwtDecode(memberToken);
                this.setState({
                    ...this.state,
                    loginMember : loginMember.member
                })
            }
        }
        if(prevProps.loginMember !== this.props.loginMember){
            this.setState({
                ...this.state,
                loginMember : this.props.loginMember
            })
        }
        if(this.state.keywordList.length === 0){
            this.setKeywordList();
        }
    }

    actions = {
        toggleSpinnerModal : status => this.toggleSpinnerModal(status),
        toggleWorkDetailModal : () => this.toggleWorkDetailModal(),
        selectWork : workNumber => this.selectWork(workNumber),
        clickLikeButton : workNumber => this.clickLikeButton(workNumber),
    }

   setWorkList = async (pageNo) => {
       this.toggleSpinnerModal(true);
        if(typeof pageNo !== "number") pageNo = this.state.pageNo;
        const {data : workList} = await getWorkList(pageNo);
        this.setState({
            ...this.state,
            workList : this.state.workList.concat(workList)
        })
        this.toggleSpinnerModal(false);
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

    selectWork = async(workNumber) => {
        if(typeof workNumber !== "number"){
            alert("잘못된 접근입니다.");
        }
        this.toggleSpinnerModal(true);
        const {data : workDetail} = await getWorkDetail(workNumber);
        if(workDetail !== null){
            this.setState({
                ...this.state,
                workDetail : workDetail
            });
            this.toggleWorkDetailModal();
        }else{
            alert("손상된 작업물 입니다.");
        }
        this.toggleSpinnerModal(false);
    }

    toggleWorkDetailModal = () => {
        this.setState({
            ...this.state,
            openWorkDetailModal : !this.state.openWorkDetailModal
        })
    }

    clickLikeButton = async (workNumber) => {
        if(this.state.loginMember == null || this.state.loginMember.memberNumber === ""){
            alert("로그인시 이용 가능합니다.");
        }else{
            this.toggleSpinnerModal(true);
            if(
                this.state.workDetail.likeList == null 
                || this.state.workDetail.likeList.find(like => like.memberNumber === this.state.loginMember.memberNumber) === undefined
            ){
                const {data : insertResult} = await insertLike(workNumber,this.state.loginMember.memberNumber);
                if(insertResult){
                    console.log("success insert Like");
                    this.changeWorkList(workNumber);
                    this.setState({
                        ...this.state,
                        workDetail : {
                            ...this.state.workDetail,
                            likeList : this.state.workDetail.likeList.concat({workNumber:workNumber,memberNumber:this.state.loginMember.memberNumber}),
                        }
                    });
                }else{
                    console.log("fail insert Like");
                }
            }else{
                const {data : deleteResult} = await deleteLike(workNumber,this.state.loginMember.memberNumber);
                if(deleteResult){
                    console.log("success delete Like");
                    this.changeWorkList(workNumber);
                    this.setState({
                        ...this.state,
                        workDetail : {
                            ...this.state.workDetail,
                            likeList : this.state.workDetail.likeList.filter(like => like.memberNumber !== this.state.loginMember.memberNumber),
                        }
                    });
                }else{
                    console.log("fail delete Like");
                }
            }
            this.toggleSpinnerModal(false);
        }
    }

    changeWorkList = async(workNumber) => {
        const {data} = await getWorkByWorkNumber(workNumber);
        if(data != null){
            this.setState({
                ...this.state,
                workList : this.state.workList.map(work => work.workNumber === data.workNumber ? data : work)
            })
        }
    }
    
    setKeywordList = async() => {
        const {data} = await getCategoryCodeList();
        this.setState({
            ...this.state,
            keywordList : data
        });
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

function createMainConsumer(WrappedComponent){
    return function UseMainConsumer(props){
        return(
            <MainConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            loginMember = {state.loginMember}
                            workList = {state.workList}
                            openSpinnerModal = {state.openSpinnerModal}
                            toggleSpinnerModal = {actions.toggleSpinnerModal}
                            openWorkDetailModal = {state.openWorkDetailModal}
                            toggleWorkDetailModal = {actions.toggleWorkDetailModal}
                            workDetail = {state.workDetail}
                            selectWork = {actions.selectWork}
                            clickLikeButton = {actions.clickLikeButton}
                            keywordList = {state.keywordList}
                            {...props}
                        />
                    )
                }
            </MainConsumer>
        )
    }
}

export{
    MainProvider,
    MainConsumer,
    createMainConsumer,
}