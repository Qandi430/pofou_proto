import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'reactstrap';
import ResumeForm from '../../containers/contents/resume/ResumeForm';
import ResumeList from '../../containers/contents/resume/ResumeList';
import '../../resources/scss/contents/resume.scss';
import PackManLoader from '../../components/common/PackmanLoader';
import { createCommonConsumer } from '../../context/commonContext';

const Resume = ({openSpinnerModal,toggleSpinnerModal,loginMember}) => {
    return (
        <div className="resume">
            <Container>
                <Switch>
                    <Route path="/resume/list" component={ResumeList} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} loginMember={loginMember}/>
                    {/* <Route path="/resume/form" component={ResumeForm} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal}/> */}
                    <Route path="/resume/form" render={(props) => <ResumeForm {...props} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} loginMember={loginMember}/>}/>
                </Switch>    
            </Container>
            <PackManLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
        </div>
    )
}

export default createCommonConsumer(Resume);