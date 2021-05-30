import React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'reactstrap';
import ResumeForm from '../../containers/contents/resume/ResumeForm';
import ResumeList from '../../containers/contents/resume/ResumeList';
import '../../resources/scss/contents/resume.scss';

const Resume = () => {
    return (
        <div className="resume">
            <Container>
                <Switch>
                    <Route path="/resume/list" component={ResumeList}/>
                    <Route path="/resume/form" component={ResumeForm}/>
                </Switch>    
            </Container>
        </div>
    )
}

export default Resume;