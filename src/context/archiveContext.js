import React, { createContext, Component } from 'react';
import { getArchive, saveBackgroundImage, uploadBackgroundImage } from '../server/archive/ArchiveServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getCategoryCodeList, singleFileUpload } from '../server/common/CommonServer';
import { getCollectedListByMemberNumber, getLikedListByMemberNumber, getTempWorkListByMemberNumber, getWorkDetail, getWorkListByMemberNumber, insertLike,deleteLike,getLikeListByWorkNumber, updateStatusByWorkNumber, deleteWorkByWorkNumber } from '../server/work/WorkServer';

const Context  = createContext();

const {Provider,Consumer : ArchiveConsumer} = Context;

class ArchiveProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            editMode : false,
            url : "",
            archive : {
                backgroundImage : null,
                keyword1 : "",
                keyword2 : "",
                memberNumber : "",
                sns : {
                    homepage : "",
                    facebook : "",
                    twitter : "",
                    instagram : "",
                    tumplr : "",
                    vimeo : "",
                    youtube : "",
                    pinterest : "",
                },
                workList : [],
            },
            currentTab : "work",
            loginMember : null,
            keywordList : [],
            openWorkDetailModal : false,
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
            openSpinnerModal : false,
            workList : [],
            likedList : [],
            collectedList : [],
            tempWorkList : [],
            openPersonalMenu : -1,
            openWorkNoticeModal : null,
        };
    }

    componentDidMount(prevProps,prevState){
        const urlSeparte = this.props.history.location.pathname.split("/");
        const memberToken = cookie.load("memberToken");
        
        if(this.state.url !== urlSeparte[urlSeparte.length -1]){
            this.setState({
                url : urlSeparte[urlSeparte.length -1]
            });
            this.getArchiveInfo(urlSeparte[urlSeparte.length -1]);
        }
        if(memberToken !== undefined){
            const loginMember = jwtDecode(memberToken);
            this.setState({
                loginMember : loginMember.member
            })
        }
        if(this.state.keywordList.length === 0){
            this.setKeywordList();
        }
    }

    componentDidUpdate(prevProps,prevState){
        const urlSeparte = this.props.history.location.pathname.split("/");
        
        if(this.state.url !== urlSeparte[urlSeparte.length -1]){
            this.setState({
                url : urlSeparte[urlSeparte.length -1]
            });
            this.getArchiveInfo(urlSeparte[urlSeparte.length -1]);
        }   
        if(this.state.keywordList.length === 0){
            this.setKeywordList();
        }
    }

    actions = {
        changeBackgroundImage : e => this.changeBackgroundImage(e),
        toggleWorkDetailModal : () => this.toggleWorkDetailModal(),
        selectWork : number => this.selectWork(number),
        toggleSpinnerModal : status => this.props.toggleSpinnerModal(status),
        toggleCurrentTab : tabName => this.toggleCurrentTab(tabName),
        togglePersonalMenu : (e,index) => this.togglePersonalMenu(e,index),
        clickLikeButton : (e,workNumber) => this.clickLikeButton(e,workNumber),
        getLikeList : workNumber => this.getLikeList(workNumber),
        changeWorkStatus : (workNumber,status) => this.changeWorkStatus(workNumber,status),
        toggleWorkNoticeModal  : (e,type,workNumber) => this.toggleWorkNoticeModal(e,type,workNumber),
        deleteWork : (workNumber) => this.deleteWork(workNumber),
    }

    setKeywordList = async () => {
        const {data} = await getCategoryCodeList();
        this.setState({
            ...this.state,
            keywordList : data
        })
    }

    getArchiveInfo = async (url) => {
        this.props.toggleSpinnerModal(true);
        const {data : archiveInfo} = await getArchive(url);
        if(archiveInfo === null || archiveInfo === ""){
            alert("잘못된 접근입니다.");
            window.location.href = "/";
        }
        const {data : workList} = await getWorkListByMemberNumber(archiveInfo.memberNumber);
        await this.setState({
            archive : archiveInfo,
            currentTab : "work",
            workList : workList,
            editMode : this.state.loginMember !== null && this.state.loginMember.memberNumber === archiveInfo.memberNumber
        });        
        this.props.toggleSpinnerModal(false);
    }

    toggleCurrentTab = async (tabName) => {
        if(this.state.currentTab !== tabName){
            this.props.toggleSpinnerModal(true);
            await this.setState({
                ...this.state,
                currentTab : tabName
            });
            if(tabName === "work"){
                const {data : workList} = await getWorkListByMemberNumber(this.state.archive.memberNumber);
                this.setState({
                    ...this.state,
                    workList : workList,
                })
            }else if(tabName === "like"){
                const {data : likedList} = await getLikedListByMemberNumber(this.state.archive.memberNumber);
                this.setState({
                    ...this.state,
                    likedList : likedList
                })
            }else if(tabName === "collect"){
                const {data : collectedList} = await getCollectedListByMemberNumber(this.state.archive.memberNumber);
                this.setState({
                    ...this.state,
                    collectedList : collectedList
                })
            }else if(tabName === "temp"){
                const {data : tempWorkList} = await getTempWorkListByMemberNumber(this.state.archive.memberNumber);
                this.setState({
                    tempWorkList : tempWorkList,
                })
            }
            this.props.toggleSpinnerModal(false);
        }
    };

    changeBackgroundImage = async(e) => {
        let form = new FormData();
        console.log(e.target.files[0]);
        form.append('file',e.target.files[0]);
        form.append('memberNumber',this.state.loginMember.memberNumber);
        const {data : uploadResult} = await singleFileUpload(form);
        console.log(uploadResult);
        if(uploadResult.result === "success"){
            const {data : saveResult} = await saveBackgroundImage(this.state.loginMember.memberNumber,uploadResult.fileName);
            if(saveResult.result === "success"){
                this.setState({
                    ...this.state,
                    archive : {
                        ...this.state.archive,
                        backgroundImage : saveResult.backgroundImage
                    }
                })
            }else{
                alert("저장에 실패하였습니다.");
            }
        }else{
            alert("파일 업로드에 실패하였습니다.");
        }
    }

    selectWork = async (workNumber) => {
        if(typeof workNumber !== "number"){
            alert("잘못된 접근입니다.");
        }
        this.props.toggleSpinnerModal(true);
        const {data : workDetail} = await getWorkDetail(workNumber);
        if(workDetail !== null){
            this.setState({
                ...this.state,
                workDetail : workDetail
            })
            this.toggleWorkDetailModal();
        }else{
            alert("손상된 작업물 입니다.");
        }
        this.props.toggleSpinnerModal(false);
    }

    toggleWorkDetailModal = () => {
        this.setState({
            openWorkDetailModal : !this.state.openWorkDetailModal
        })
    }

    togglePersonalMenu = (e,index) => {
        e.stopPropagation();
        if(this.state.openPersonalMenu === index){
            this.setState({
                ...this.state,
                openPersonalMenu : -1
            })
        }else{
            this.setState({
                ...this.state,
                openPersonalMenu : index
            })
        }
    }

    clickLikeButton = async (e,workNumber) => {
        e.stopPropagation();
        if(this.state.loginMember == null || this.state.loginMember.memberNumber === ""){
            // alert("로그인시 이용 가능합니다.");
            this.props.toggleLoginNoticeModal();
        }else{
            this.props.toggleSpinnerModal(true);
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
            this.props.toggleSpinnerModal(false);
        }
    }

    getLikeList = async(workNumber) => {
        const {currentTab,workList,likedList,collectedList,tempWorkList} = this.state;
        const {data} = await getLikeListByWorkNumber(workNumber);
        if(currentTab === "work"){
            this.setState({
                ...this.state,
                workList : workList.map(work => work.workNumber === workNumber ? {...work,likeList : data} : work),
            })
        }else if(currentTab === "like"){
            this.setState({
                ...this.state,
                likedList : likedList.map(work => work.workNumber === workNumber ? {...work,likeList : data} : work),
            })
        }else if(currentTab === "collect"){
            this.setState({
                ...this.state,
                collectedList : collectedList.map(work => work.workNumber === workNumber ? {...work,likeList : data} : work),
            })
        }else if(currentTab === "temp"){
            this.setState({
                tempWorkList : tempWorkList.map(work => work.workNumber === workNumber ? {...work,likeList : data} : work),
            })
        }
    }

    changeWorkStatus = async (workNumber,status) => {
        this.props.toggleSpinnerModal(true);
        const {data} = await updateStatusByWorkNumber(workNumber,status);
        if(data){
            if(this.state.currentTab === "work"){
                console.log("currentTab is work")
                await this.setState({
                    ...this.state,
                    workList : this.state.workList.filter(work => work.workNumber !== workNumber),
                });
            }else if(this.state.currentTab === "temp"){
                console.log("currentTab is work")
                await this.setState({
                    tempWorkList : this.state.tempWorkList.filter(temp =>temp.workNumber !== workNumber),
                })
            }
        }
        this.props.toggleSpinnerModal(false);
        return data;
    }

    deleteWork = async (workNumber) => {
        this.props.toggleSpinnerModal(true);
        const {data} = await deleteWorkByWorkNumber(workNumber,this.state.loginMember.memberNumber);
        if(data){
            if(this.state.currentTab === "work"){
                await this.setState({
                    ...this.state,
                    workList : this.state.workList.filter(work => work.workNumber !== workNumber),
                });
            }else if(this.state.currentTab === "temp"){
                await this.setState({
                    tempWorkList : this.state.tempWorkList.filter(temp =>temp.workNumber !== workNumber),
                })
            }
        }
        this.props.toggleSpinnerModal(false);
        return data;
    }

    toggleWorkNoticeModal  = (e,type,workNumber) => {
        if(e !== undefined){
            e.stopPropagation();
        }
        if(type === undefined || workNumber === undefined){
            this.setState({
                ...this.state,
                openWorkNoticeModal : null
            })
        }else{
            this.setState({
                ...this.state,
                openWorkNoticeModal : {
                    type : type,
                    workNumber : workNumber
                }
            })
        }
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

function createArchiveConsumer(WrappedComponent){
    return function UseArchiveConsumer(props){
        return(
            <ArchiveConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            loginMember = {state.loginMember}
                            archive = {state.archive}
                            editMode = {state.editMode}
                            changeBackgroundImage = {actions.changeBackgroundImage}
                            keywordList = {state.keywordList}
                            openWorkDetailModal = {state.openWorkDetailModal}
                            toggleWorkDetailModal = {actions.toggleWorkDetailModal}
                            selectWork = {actions.selectWork}
                            openSpinnerModal = {state.openSpinnerModal}
                            toggleSpinnerModal = {actions.toggleSpinnerModal}
                            workDetail = {state.workDetail}
                            currentTab = {state.currentTab}
                            toggleCurrentTab = {actions.toggleCurrentTab}
                            workList = {state.workList}
                            likedList = {state.likedList}
                            collectedList = {state.collectedList}
                            tempWorkList = {state.tempWorkList}
                            togglePersonalMenu = {actions.togglePersonalMenu}
                            openPersonalMenu = {state.openPersonalMenu}
                            clickLikeButton = {actions.clickLikeButton}
                            getLikeList = {actions.getLikeList}
                            changeWorkStatus = {actions.changeWorkStatus}
                            openWorkNoticeModal = {state.openWorkNoticeModal}
                            toggleWorkNoticeModal = {actions.toggleWorkNoticeModal}
                            deleteWork = {actions.deleteWork}
                            {...props}
                        />
                    )
                }
            </ArchiveConsumer>
        )
    }
}

export{
    ArchiveProvider,
    ArchiveConsumer,
    createArchiveConsumer,
}