import React,{useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import Management from '../../containers/portfolio/management/Management';
import '../../resources/scss/portfolio/portfolio.scss';
import Config from '../../containers/portfolio/management/Config';
import { PortfolioProvider } from '../../context/portfolioContext';
import { createCommonConsumer } from '../../context/commonContext';
import PackmanLoader from '../../components/common/PackmanLoader';
import ResumeDetailModal from '../../components/common/ResumeDetailModal';

const Portfolio = ({openSpinnerModal,toggleSpinnerModal,match,history}) => {

    const [resumeDetail,setResumeDetail] = useState(null);
    const openResumeDetailModal = (resume) => {
        setResumeDetail(resume);
    }
    const closeResumeDetailModal =  () => {
        setResumeDetail(null);
    }

    return (
        <PortfolioProvider openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} match={match} history={history} openResumeDetailModal={openResumeDetailModal} closeResumeDetailModal={closeResumeDetailModal}>
            <div className="portfolio">
                <Switch>
                    <Route path="/portfolio/management" render={(props) => <Management  {...props} openResumeDetailModal={openResumeDetailModal}/>}/>
                    <Route path="/portfolio/config/:id" render={(props) => <Config  {...props} openResumeDetailModal={openResumeDetailModal}/>}/>
                    <Route path="/portfolio/config" rener={(props) => <Config  {...props} openResumeDetailModal={openResumeDetailModal}/>}/>
                </Switch>
            </div>
            <PackmanLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <ResumeDetailModal resume={resumeDetail} closeModal={closeResumeDetailModal}/>
        </PortfolioProvider>
    )
}

export default createCommonConsumer(Portfolio);