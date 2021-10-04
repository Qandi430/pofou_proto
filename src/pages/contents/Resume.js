import React,{useState} from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'reactstrap';
import ResumeForm from '../../containers/contents/resume/ResumeForm';
import ResumeList from '../../containers/contents/resume/ResumeList';
import '../../resources/scss/contents/resume.scss';
import PackManLoader from '../../components/common/PackmanLoader';
import { createCommonConsumer } from '../../context/commonContext';
import ResumeDetailModal from '../../components/common/ResumeDetailModal';

const Resume = ({openSpinnerModal,toggleSpinnerModal,loginMember}) => {
    const [resumeDetail,setResumeDetail] = useState(null);
    const openResumeDetailModal = (resume) => {
        setResumeDetail(resume);
    }
    const closeResumeDetailModal =  () => {
        setResumeDetail(null);
    }
    return (
        <div className="resume">
            <Container>
                <Switch>
                    {/* <Route path="/resume/list" component={ResumeList} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} loginMember={loginMember}/> */}
                    {/* <Route path="/resume/form" component={ResumeForm} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal}/> */}
                    <Route path="/resume/list" render={(props) => <ResumeList {...props} toggleSpinnerModal={toggleSpinnerModal} openResumeDetailModal={openResumeDetailModal}/>}/>
                    <Route path="/resume/form/:resumeNumber" render={(props) => <ResumeForm {...props} toggleSpinnerModal={toggleSpinnerModal} loginMember={loginMember} openResumeDetailModal={openResumeDetailModal}/>}/>
                    <Route path="/resume/form" render={(props) => <ResumeForm {...props} toggleSpinnerModal={toggleSpinnerModal} loginMember={loginMember} openResumeDetailModal={openResumeDetailModal}/>}/>
                </Switch>    
            </Container>
            <PackManLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <ResumeDetailModal resume={resumeDetail} closeModal={closeResumeDetailModal}/>
        </div>
    )
}

export default createCommonConsumer(Resume);