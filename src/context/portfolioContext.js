import React, { createContext, Component } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getDataByName } from '../resources/data/portfolioData';
import { getResumeDetailByResumeNumber } from '../server/resume/ResumeServer';
import { createPortfolio, getPortfolioByUrl, getPortfolioDataByMemberNumber, updatePortfolio } from '../server/portfolio/PortfolioServer';
import { getWorkListByMemberNumber } from '../server/work/WorkServer';
import { debounce } from 'lodash-es';



const Context  = createContext();
const {Provider,Consumer : PortfolioConsumer} = Context;

class PortfolioProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginMember : null,
            representativeResume : null,
            portfolidForm : null,
            openResumeSelectModal : false,
            openSpinnerModal : false,
            resume : null,
            portfolioData : null,
            addBlock : null,
            configBlock : null,
            openSortBlockModal : false,
            debouncerTimer : 0,
            modifyHistory : [],
            openNoticeModal : "",
            managementData : null,
            checkManagementData : false,
        };
    }

    componentDidMount(){
        const memberToken = cookie.load("memberToken");
        let loginMember = null;
        if(memberToken !== undefined){
            loginMember = jwtDecode(memberToken);
        }
        // const loginMember = jwtDecode(memberToken);
        if(this.state.loginMember === null){
            if(memberToken !== undefined && loginMember !== null){  
                this.setState({
                    ...this.state,
                    loginMember : loginMember.member
                });
                
            }else{
                if(this.props.history.location.pathname.indexOf("/portfolio/management") > -1 || this.props.history.location.pathname.indexOf("/portfolio/config") > -1){
                    alert("로그인시 이용 가능합니다.");
                    this.props.history.push("/");
                }
            };   
        }
        
        if(this.props.history.location.pathname.indexOf("/portfolio/management") > -1){
            if(this.state.managementData === null || this.state.managementData === ""){
                if(memberToken !== undefined && loginMember !== null){
                    this.getPortfolioMangement(loginMember.member.memberNumber);
                }else{
                    alert("로그인시 이용 가능합니다.");
                    this.props.history.push("/");
                }
            }   
        }
        if(this.props.history.location.pathname.indexOf("/portfolio/config") > -1){
            if(this.state.portfolioData === null){
                const urlSplit = this.props.history.location.pathname.split("/");
                const url = urlSplit[urlSplit.length-1];
                this.getPortfolio(url);
            }else{
                if(this.state.portfolioData.memberNumber !== loginMember.member.memberNumber){
                    alert("잘못된 접근입니다.");
                    this.props.history.push("/");
                }
            }
            window.addEventListener('keydown', this.handleKeyDown)
        }
        if(!this.props.openSpinnerModal){
            document.body.classList.remove('modal-open');
        }
    }

    componentDidUpdate(prevProps,prevState){
        
        const memberToken = cookie.load("memberToken");
        let loginMember = null;
        if(memberToken !== undefined){
            loginMember = jwtDecode(memberToken);
        }
        
        if(this.state.loginMember === null){
            if(memberToken !== undefined && loginMember !== null){  
                this.setState({
                    ...this.state,
                    loginMember : loginMember.member
                });
            }else{
                alert("로그인시 이용 가능합니다.");
                this.props.history.push("/");
            };   
        }else{
            if(memberToken === undefined && loginMember === null){
                console.log("login")
                alert("로그인시 이용 가능합니다.");
                this.props.history.push("/");
            }
        }
        if(this.props.history.location.pathname.indexOf("/portfolio/management") > -1){
            if((this.state.managementData === null || this.state.managementData === "") && !this.state.checkManagementData){
                if(memberToken !== undefined && loginMember !== null){
                    this.getPortfolioMangement(loginMember.member.memberNumber);
                }else{
                    alert("로그인시 이용 가능합니다.");
                    this.props.history.push("/");
                }
            }   
        }
        if(this.props.history.location.pathname.indexOf("/portfolio/config") > -1){
            if(this.state.portfolioData === null){
                const urlSplit = this.props.history.location.pathname.split("/");
                const url = urlSplit[urlSplit.length-1];
                this.getPortfolio(url);
            }else{
                if(this.state.portfolioData.memberNumber !== loginMember.member.memberNumber){
                    alert("잘못된 접근입니다.");
                    this.props.history.push("/");
                }
            }
            window.addEventListener('keydown', this.handleKeyDown)
        }
        // const portfolioId = this.props.match.
        if(!this.props.openSpinnerModal){
            document.body.classList.remove('modal-open');
        }
    }

    actions = {
        getPortfolioData : id => this.getPortfolioData(id),
        toggleResumeSelectModal : portfolioName => this.toggleResumeSelectModal(portfolioName),
        toggleSpinnerModal : state => this.props.toggleSpinnerModal(state),
        openResumeDetailModal : resume => this.props.openResumeDetailModal(resume),
        closeResumeDetailModal : () => this.props.closeResumeDetailModal(),
        setResume : resumeNumber => this.setResume(resumeNumber),
        getPortfolio : url => this.getPortfolio(url),
        changeGlobalConfig : (name,value) => this.changeGlobalConfig(name,value),
        //addBlock
        toggleAddBlock : index => this.toggleAddBlock(index),
        addNewBlock : block => this.addNewBlock(block),
        //modifyBlock
        selectConfigBlock : block => this.selectConfigBlock(block),
        modifyBlock : modifiedBlock => this.modifyBlock(modifiedBlock),
        copyBlock : () => this.copyBlock(),
        removeBlock : () => this.removeBlock(),
        toggleSortBlockModal : () => this.toggleSortBlockModal(),
        saveSortBlock : newList => this.saveSortBlock(newList),
        //history
        saveHistory : history => this.saveHistory(history),
        revertHistory : index => this.revertHistory(index),
        toggleNoticeModal : noticeName => this.toggleNoticeModal(noticeName),
        clickUpdateButton : () => this.clickUpdateButton(),
        clickQuitButton : () => this.clickQuitButton(),
    }

    //management
    getPortfolioMangement = async (memberNumber) => {
        const {data : managementData} = await getPortfolioDataByMemberNumber(memberNumber);
        this.setState({
            ...this.state,
            checkManagementData : true,
            managementData : managementData,
        });
    };
    getPortfolioMangement = debounce(this.getPortfolioMangement,500);

    //config
    getPortfolioData = async(id) => {
        if(isNaN(Number(id))){
            console.log("template");
            let data = getDataByName(id);
            console.log(data);
        }else{
            console.log("load");
        }
    }

    changeGlobalConfig = async (name,value) => {
        await this.setState({
            ...this.state,
            portfolioData : {...this.state.portfolioData,[name]:value}
        });
        let historyName = "";
        switch(name){
            case "backgroundColor":
                historyName = "globalBackgroundColor";
                break;
            case "fontFamily":
                historyName = "globalFontFamily";
                break;
            case "backgroundImage":
                historyName = "globalBackgroundImage";
                break;
            case "backgroundPosition":
                historyName = "globalBackgroundPosition";
                break;
            case "backgroundRepeat":
                historyName = "globalBackgroundRepeat";
                break;
            case "backgroundSize":
                historyName = "globalBackgroundSize";
                break;
            case "color":
                historyName = "globalFontColor";
                break;
            default:
                historyName = name;
        };
        this.saveHistory(historyName);
    }

    toggleResumeSelectModal = (portfolioName) => {
        let newPortfolio = null;
        if(portfolioName !== undefined && typeof portfolioName === "string"){
            newPortfolio =  getDataByName(portfolioName);
        }

        this.setState({
            openResumeSelectModal : !this.state.openResumeSelectModal,
            portfolidForm : newPortfolio,
        });
    }

    setResume = async (resumeNumber) => {
        this.props.toggleSpinnerModal(true);
        this.state.portfolidForm.memberNumber = this.state.loginMember.memberNumber;
        this.state.portfolidForm.resumeNumber = resumeNumber;
        
        const {data} = await createPortfolio(this.state.portfolidForm);
        if(data){
            await this.setState({
                checkManagementData : false,
                openResumeSelectModal : false,
            });
            this.props.toggleSpinnerModal(false);
            this.props.history.push(`/portfolio/config/${this.state.loginMember.url}`);
        }else{
            alert("포트폴리오 개설에 실패하였습니다.");
            this.props.toggleSpinnerModal(false);
        }   
    }

    getPortfolio = async (url) => {
        if(!this.props.openSpinnerModal){
            console.log(url)
            this.props.toggleSpinnerModal(true);
            const {data : portfolio} = await getPortfolioByUrl(url);
            const {data : resume} = await getResumeDetailByResumeNumber(portfolio.resumeNumber);
            const {data : workList} = await getWorkListByMemberNumber(portfolio.memberNumber);
            this.setState({
                ...this.state,
                portfolioData : portfolio,
                resume : resume,
                workList : workList,
            })
            this.props.toggleSpinnerModal(false);
            this.saveHistory("logStart");
        }
    }

    // getPortfolio = debounce(this.getPortfolio,500);

    //addBlock
    toggleAddBlock = (index) => {
        if(typeof index === "number"){
            this.setState({
                ...this.state,
                addBlock : {
                    index : index+1,
                    id : "",
                    name : "",
                    category : "",
                    paddingTop: 30,
                    paddingBottom : 30,
                    container : true,
                    grid : 1,
                    backgroundColor : "transparent",
                    backgroundImage : "",
                    backgroundPosition : "center center",
                    backgroundSize : "cover",
                    backgroundRepeat : "no-repeat",
                    effectName : "",
                    effectDuration : 0.5,
                }
            });
            document.body.classList.add("fixedBody");
        }else{
            this.setState({
                ...this.state,
                addBlock : null,
            });
            document.body.classList.remove('fixedBody');
        }
    };

    addNewBlock = async (block) => {
        let {addBlock,portfolioData} = this.state;
        addBlock["category"] = block.category;
        addBlock["contents"] = block.contents;
        if(block.grid !== undefined){
            addBlock["grid"] = block.grid;
        };
        portfolioData.blockList.forEach(
            block => {
                block.index = block.index >= addBlock.index ? block.index +1 : block.index 
            }
        )
        portfolioData.blockList.splice(addBlock.index,0,addBlock);
        await this.setState({
            addBlock : null,
            portfolioData : portfolioData,
        });
        //saveHistory - addBlock
        this.saveHistory("addBlock");
        document.body.classList.remove('fixedBody');
    };

    //modify block
    selectConfigBlock = (block) => {
        if(block !== undefined){
            this.setState({
                ...this.state,
                configBlock : block
            });
        }else{
            this.setState({
                ...this.state,
                configBlock : null
            });
        }
    };

    modifyBlock = (modifiedBlock) => {
        if(modifiedBlock !== null){
            this.setState({
                ...this.state,
                configBlock : modifiedBlock,
                portfolioData : {
                    ...this.state.portfolioData,
                    blockList : this.state.portfolioData.blockList.map(
                        block => block.index === modifiedBlock.index ? modifiedBlock : block
                    )
                }
            });
        }
    };

    copyBlock = () => {
        let {configBlock,portfolioData} = this.state;
        const newBlock = {...configBlock,index : configBlock.index +1};
        portfolioData.blockList.forEach(
            block => {
                block.index = block.index >= newBlock.index ? block.index +1 : block.index
            }
        )
        portfolioData.blockList.splice(newBlock.index,0,newBlock);
        this.setState({
            ...this.state,
            configBlock : null,
            portfolioData : portfolioData,
        });
        //saveHistory - copyBlock
        this.saveHistory("copyBlock");
    }

    removeBlock = () => {
        let {portfolioData,configBlock} = this.state;
        if(window.confirm("블럭을 삭제하면 변경된 내용이 함께 삭제됩니다.\n삭제하시겠습니까?")){
            portfolioData.blockList = portfolioData.blockList.filter(block => block.index !== configBlock.index);
            this.setState({
                ...this.state,
                portfolioData : portfolioData,
                configBlock : null,
            });
            //saveHistory - removeBlock
            this.saveHistory("removeBlock");
        }
    };

    toggleSortBlockModal = () => {
        this.setState({
            ...this.state,
            openSortBlockModal : !this.state.openSortBlockModal
        });
    };

    saveSortBlock = (newList) => {
        this.setState({
            ...this.state,
            portfolioData : {
                ...this.state.portfolioData,
                blockList : newList.map((block,index) => ({...block,index: index})),
            },
            configBlock : null,
            openSortBlockModal : false,
        })
    }

    //history
    saveHistory = (history) => {
        let modifyHistory = JSON.parse(JSON.stringify(this.state.modifyHistory));
        modifyHistory.unshift({index : this.state.modifyHistory.length,data : JSON.parse(JSON.stringify(this.state.portfolioData)),history : history,time : new Date()});
        this.setState({
            ...this.state,
            modifyHistory : modifyHistory
        });
        
    };

    saveHistory = debounce(this.saveHistory,500);

    revertHistory = (index) => {
        const {modifyHistory} = this.state;
        if(index === "back"){
            index = modifyHistory.length - 2 < 0 ? 0 : modifyHistory.length -2;
        }
        const selectedHistory = modifyHistory.find(history => history.index === index);
        this.setState({
            ...this.state,
            portfolioData : selectedHistory.data,
            modifyHistory : JSON.parse(JSON.stringify(modifyHistory.filter(history => history.index <= index)))
        })
    }

    handleKeyDown = (event) => {
        if((event.metaKey && event.key === "z") || (event.ctrlKey && event.key === "z")){
            this.revertHistory("back");
        }
    }

    toggleNoticeModal = (noticeName) => {
        if(noticeName === "update" || noticeName === "quit"){
            this.setState({
                ...this.state,
                openNoticeModal : noticeName,
            })
        }else{
            this.setState({
                ...this.state,
                openNoticeModal : "",
            })
        }
    }

    clickUpdateButton = async() => {
        this.props.toggleSpinnerModal(true);
        const {data} = await updatePortfolio(this.state.portfolioData);
        console.log(data);
        if(data){
            alert("저장되었습니다.");
            this.setState({
                ...this.state,
                openNoticeModal : "",
                modifyHistory : [{index : 0,data : JSON.parse(JSON.stringify(this.state.portfolioData)), history : "logStart",time : new Date()}]
            });
        }else{
            alert("저장에 실패하였습니다.");
        }
        this.props.toggleSpinnerModal(false);
    }

    clickQuitButton = () => {
        this.props.history.goBack();
        this.setState({
            ...this.state,
            openNoticeModal : "",
        })
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

function createPortfolioConsumer(WrappedComponent){
    return function UsePortfolioConsumer(props){
        return(
            <PortfolioConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            loginMember={state.loginMember}
                            getPortfolioData = {actions.getPortfolioData}
                            openResumeSelectModal = {state.openResumeSelectModal}
                            toggleResumeSelectModal = {actions.toggleResumeSelectModal}
                            toggleSpinnerModal = {actions.toggleSpinnerModal}
                            openResumeDetailModal = {actions.openResumeDetailModal}
                            closeResumeDetailModal = {actions.closeResumeDetailModal}
                            setResume={actions.setResume}
                            getPortfolio = {actions.getPortfolio}
                            portfolioData = {state.portfolioData}
                            resume = {state.resume}
                            workList = {state.workList}
                            changeGlobalConfig = {actions.changeGlobalConfig}
                            //addBlock
                            addBlock = {state.addBlock}
                            toggleAddBlock = {actions.toggleAddBlock}
                            addNewBlock = {actions.addNewBlock}
                            //modifyBlock
                            configBlock = {state.configBlock}
                            selectConfigBlock = {actions.selectConfigBlock}
                            modifyBlock = {actions.modifyBlock}
                            copyBlock = {actions.copyBlock}
                            removeBlock = {actions.removeBlock}
                            openSortBlockModal = {state.openSortBlockModal}
                            toggleSortBlockModal = {actions.toggleSortBlockModal}
                            saveSortBlock = {actions.saveSortBlock}
                            modifyHistory = {state.modifyHistory}
                            saveHistory = {actions.saveHistory}
                            revertHistory = {actions.revertHistory}
                            openNoticeModal = {state.openNoticeModal}
                            toggleNoticeModal = {actions.toggleNoticeModal}
                            clickUpdateButton = {actions.clickUpdateButton}
                            clickQuitButton = {actions.clickQuitButton}
                            //management
                            managementData = {state.managementData}
                            {...props}
                        />
                    )
                }
            </PortfolioConsumer>
        )
    }
}

export{
    PortfolioProvider,
    PortfolioConsumer,
    createPortfolioConsumer,
}