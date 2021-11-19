import React,{useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import Management from '../../containers/portfolio/management/Management';
import '../../resources/scss/portfolio/portfolio.scss';
import Config from '../../containers/portfolio/management/Config';
import { PortfolioProvider } from '../../context/portfolioContext';
import { createCommonConsumer } from '../../context/commonContext';
import PackmanLoader from '../../components/common/PackmanLoader';
import ResumeDetailModal from '../../components/common/ResumeDetailModal';
import PortfolioContainer from '../../containers/portfolio/PortfolioContainer';
import WorkDetailModal from '../../components/common/WorkDetailModal';
import { getWorkDetail } from '../../server/work/WorkServer';

const Portfolio = ({openSpinnerModal,toggleSpinnerModal,match,history,loginMember}) => {

    const [resumeDetail,setResumeDetail] = useState(null);
    const openResumeDetailModal = (resume) => {
        setResumeDetail(resume);
    }
    const closeResumeDetailModal =  () => {
        setResumeDetail(null);
    }
    const [workDetail,setWorkDetail] = useState({
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
    },);
    
    const [openWorkDetailModal,setOpenWorkDetailModal] = useState(false);
    const toggleWorkDetailModal = () => {
        setOpenWorkDetailModal(!openWorkDetailModal);
    }
    const selectWork = async(workNumber) => {
        if(typeof workNumber !== "number"){
            alert("잘못된 접근입니다.");
        }
        toggleSpinnerModal(true);
        const {data : workDetail} = await getWorkDetail(workNumber);
        if(workDetail !== null){
            setWorkDetail(workDetail);
            toggleWorkDetailModal();
        }else{
            alert("손상된 작업물 입니다.");
        }
        toggleSpinnerModal(false);
    }
    return (
        <PortfolioProvider openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} match={match} history={history} openResumeDetailModal={openResumeDetailModal} closeResumeDetailModal={closeResumeDetailModal}>
            <div className="portfolio">
                <Switch>
                    <Route path="/portfolio/management" render={(props) => <Management  {...props} openResumeDetailModal={openResumeDetailModal}/>}/>
                    <Route path="/portfolio/config/:url" render={(props) => <Config  {...props} selectWork={selectWork} openResumeDetailModal={openResumeDetailModal}/>}/>
                    {/* <Route path="/portfolio/config" rener={(props) => <Config  {...props} openResumeDetailModal={openResumeDetailModal}/>}/> */}
                    <Route path="/portfolio/:url" render={(props) => <PortfolioContainer {...props} selectWork={selectWork} toggleSpinnerModal={toggleSpinnerModal}/>}/>
                </Switch>
            </div>
            <PackmanLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <ResumeDetailModal resume={resumeDetail} closeModal={closeResumeDetailModal}/>
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember}/>
        </PortfolioProvider>
    )
}

export default createCommonConsumer(Portfolio);