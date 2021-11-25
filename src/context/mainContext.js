import React, { createContext, Component } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getWorkList, getWorkListBySearchText } from '../server/main/MainServer';
import { deleteLike, getLikeListByWorkNumber, getWorkByWorkNumber, getWorkDetail, insertLike } from '../server/work/WorkServer';
import {getCategoryCodeList} from '../server/common/CommonServer';
import {getQuery} from '../components/common/CommonScript';

const Context  = createContext();

const {Provider,Consumer : MainConsumer} = Context;

class MainProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginMember : null,
            pageNo : 1,
            workList : [],
            currentWorkList : [],
            currentCategory : "all",
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
                commentList: [],
            },
            openWorkDetailModal : false,
            keywordList : [],
            serchKeywrod : "",
        };
    }

    componentDidMount(prevProps,prevState){
        // const urlSeparte = this.props.history.location.pathname.split("/");
        const memberToken = cookie.load("memberToken");
        let query = getQuery();
        // console.log("query = ",query);
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
        if(query.searchKeyword === undefined){
            // console.log("main");
            this.cleanWorkList();
            this.setWorkList();
        }else{
            // console.log(query.searchKeyword);
            this.cleanWorkList();
            this.setWorkListBySearchText(query.searchKeyword);
        }
        
    }

    componentDidUpdate(prevProps,prevState){
        let query = getQuery();
        // console.log("query = ",query);
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
        clickLikeButton : (e,workNumber) => this.clickLikeButton(e,workNumber),
        getLikeList : workNumber => this.getLikeList(workNumber),
        cleanWorkList : () => this.cleanWorkList(),
        setWorkListBySearchText : (searchText,pageNo) => this.setWorkListBySearchText(searchText,pageNo),
        toggleLoginNoticeModal : () => this.props.toggleLoginNoticeModal(),
        setCurrentList : category => this.setCurrentList(category),
    }

   setWorkList = async (pageNo) => {
       this.toggleSpinnerModal(true);
        if(typeof pageNo !== "number") pageNo = this.state.pageNo;
        const {data : workList} = await getWorkList(pageNo);
        await this.setState({
            ...this.state,
            workList : workList,
        });
        this.setCurrentList("all");
        this.toggleSpinnerModal(false);
   };

   setCurrentList = async (category) => {
        const {workList} = this.state;
        let newList = category === 'all' || category === '' || category === undefined ? workList :  workList.filter(work => work.category1 === category || work.category2 === category);
        this.setState({
            ...this.state,
            currentCategory : category,
            currentWorkList : newList
        });
   }

   setWorkListBySearchText = async (searchText,pageNo) => {
        this.toggleSpinnerModal();
        if(typeof pageNo !== "number") pageNo = this.state.pageNo;
        const {data : workList} = await getWorkListBySearchText(searchText,pageNo);
        await this.setState({
            ...this.state,
            workList : workList,
        });
        this.setCurrentList("all");
        this.toggleSpinnerModal(false);
   }

   cleanWorkList = async () => {
       await this.setState({
           ...this.state,
           workList : [],
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

    selectWork = async(workNumber) => {
        if(typeof workNumber !== "number"){
            alert("잘못된 접근입니다.");
        }
        this.toggleSpinnerModal(true);
        const {data : workDetail} = await getWorkDetail(workNumber);

        if(workDetail !== null){
            await this.setState({
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

    clickLikeButton = async (e,workNumber) => {

        e.stopPropagation();
        if(this.state.loginMember == null || this.state.loginMember.memberNumber === ""){
            // alert("로그인시 이용 가능합니다.");
            this.props.toggleLoginNoticeModal();
        }else{
            this.toggleSpinnerModal(true);
            const work = this.state.workList.find(work => work.workNumber === workNumber);

            if(
                work.likeList == null 
                || work.likeList.find(like => like.memberNumber === this.state.loginMember.memberNumber) === undefined
            ){
                const {data : insertResult} = await insertLike(workNumber,this.state.loginMember.memberNumber);
                if(insertResult){
                    
                    this.getLikeList(workNumber);
                }else{
                    console.log("fail insert Like");
                    alert("오류가 발생했습니다.");
                }
            }else{
                const {data : deleteResult} = await deleteLike(workNumber,this.state.loginMember.memberNumber);
                if(deleteResult){
                    this.getLikeList(workNumber);
                }else{
                    console.log("fail delete Like");
                    alert("오류가 발생했습니다.");
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

    getLikeList = async(workNumber) => {
        const {data} = await getLikeListByWorkNumber(workNumber);
        
        this.setState({
            ...this.state,
            workList : this.state.workList.map(work => work.workNumber === workNumber ? {...work,likeList : data} : work)
        });
    }

    changeSearchKeyword = (keyword) => {
        this.setState({
            ...this.state,
            searchKeyword  : keyword,
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
                            getLikeList = {actions.getLikeList}
                            cleanWorkList = {actions.cleanWorkList}
                            setWorkListBySearchText = {actions.setWorkListBySearchText}
                            toggleLoginNoticeModal = {actions.toggleLoginNoticeModal}
                            currentWorkList = {state.currentWorkList}
                            setCurrentList = {actions.setCurrentList}
                            currentCategory = {state.currentCategory}
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