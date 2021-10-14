import React from 'react';
import { convertEducation } from '../../../common/CommonScript';

const BasicHistory = ({educationList,grid,link,resume}) => {
    return (
        <div className={`contents basicHistory grid${grid}`}>
            <ul className="educationList">
                {
                    link === "education" &&
                        resume.educationList.map(
                            (education) => 
                                <li className="educationContent" key={education.index}>
                                    <h4 className="educationName">
                                        {education.educationName}
                                    </h4>
                                    
                                    <ul className="majorList">
                                        {
                                            education.majorList.map(
                                                (major,index) => 
                                                <li key={index}>{major.majorName} {convertEducation("majorType",major.majorType)} ({convertEducation("degreeType",major.degreeType)})</li>
                                            )
                                        }
                                        
                                    </ul>
                                    <p className="educationPeriod">
                                        {`${education.admissionYear}-${education.graduatedYear} ${convertEducation("graduatedType",education.graduatedType)}`}
                                    </p>
                                    <p className="content">
                                        {education.educationContent}
                                    </p>
                                </li>
                        )
                }
            </ul>
        </div>
    )
}

export default BasicHistory;