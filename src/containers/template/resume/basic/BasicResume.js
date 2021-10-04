import React from 'react'
import Career    from '../../../../components/template/resume/basic/Career';
import BasicInfo from '../../../../components/template/resume/basic/BasicInfo';
import Education from '../../../../components/template/resume/basic/Education';
import Certificate from '../../../../components/template/resume/basic/Certificate';
import Activity from '../../../../components/template/resume/basic/Activity';
import Preferential from '../../../../components/template/resume/basic/Preferential';
import Skill from '../../../../components/template/resume/basic/Skill';
import Introduction from '../../../../components/template/resume/basic/Introduction';

const BasicResume = ({resume}) => {
    return (
        <div className="template basic">
            <div className="resumeTitle">
                <h3 className="title">{resume.title}</h3>
            </div>
            <BasicInfo resume={resume}/>
            <Education education={resume.educationList}/>
            <Career resume={resume}/>
            {
                resume.displayCertificate &&
                    <Certificate certificateList={resume.certificateList}/>
            }
            {
                resume.displayActivity &&
                    <Activity activityList={resume.activityList}/>
            }
            {
                resume.displayPreferred &&
                    <Preferential preferred={resume.preferred}/>
            }
            {
                resume.displaySkill &&
                    <Skill skillList={resume.skillList}/>
            }
            {
                resume.displayIntroduction &&
                    <Introduction introductionList={resume.introductionList}/>
            }
        </div>
    )
}

export default BasicResume
