import React, { createContext, Component } from 'react';
import { getArchive, saveBackgroundImage, uploadBackgroundImage } from '../server/archive/ArchiveServer';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getCategoryCodeList, singleFileUpload } from '../server/common/CommonServer';
import { getWorkDetail } from '../server/work/WorkServer';

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
            loginMember : null,
            keywordList : [],
            openWorkDetailModal : false,
            workDetail : {
                memberNumber : "",
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
                contentsList : [
                    
                ],
            },
            openSpinnerModal : false,
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
        toggleSpinnerModal : status => this.toggleSpinnerModal(status),
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

    setKeywordList = async () => {
        const {data} = await getCategoryCodeList();
        this.setState({
            ...this.state,
            keywordList : data
        })
    }

    getArchiveInfo = async (url) => {
        const {data} = await getArchive(url);
        if(data === null || data === ""){
            alert("잘못된 접근입니다.");
            window.location.href = "/";
        }
        this.setState({
            archive : data,
            editMode : this.state.loginMember !== null && this.state.loginMember.memberNumber === data.memberNumber
        })
    }

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
        this.toggleSpinnerModal(true);
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
        this.toggleSpinnerModal(false);
    }

    toggleWorkDetailModal = () => {
        this.setState({
            openWorkDetailModal : !this.state.openWorkDetailModal
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