import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EducationContents = ({education,removeEducation,modifyEducation}) => {

    const convertValueToName = (type,name) => {
        if(type === "educationType"){
            switch(name){
                case "highSchool":
                    return "고등학교";
                case "univercity":
                    return "대학교"
                default:
                    return "학사";
            }
        }else if(type === "degreeType"){
            switch(name){
                case "Bechelor":
                    return "학사";
                case "Associate":
                    return "전문학사";
                case "Master":
                    return "석사";
                case "Doctor":
                    return "박사";
                case "Certification":
                    return "수료";
                default :
                    return "";
            }
        }else if(type === "majorType"){
            switch(name){
                case "major":
                    return "전공";
                case "double":
                    return "복수전공";
                case "minor":
                    return  "부전공";
                case "linked":
                    return "연합전공";
                case "course":
                    return "코스";
                default:
                    return "선택";
            }
        }else if(type === "highScoolMajor"){
            switch(name){
                case "NatudalSciences":
                    return "이과";
                case "LiberalArts":
                    return "문과";
                case "Meister":
                    return "전문(실업)";
                case "ArtsAndPhysical":
                    return "예체능";
                default:
                    return "선택";
            }
        }else if(type === "graduatedType"){
            switch(name){
                case "graduate":
                    return "졸업";
                case "enrollment":
                    return "재학";
                case "semesterOff":
                    return "휴학";
                case "dropOut":
                    return "중퇴";
                default :
                    return "선택";
            }
        }
    }

    return (
        <div className="educationContent" key={education.index}>
            <h4 className="educationName">
                {education.educationName}
            </h4>
            
            <ul className="majorList">
                {
                    education.educationType === "univercity" ?
                    education.majorList.map(
                        (major,index) => 
                        <li key={index}>{major.majorName} {convertValueToName("majorType",major.majorType)} ({convertValueToName("degreeType",major.degreeType)})</li>
                    )
                    :
                    <li>{education.highScoolMajor}</li>
                }
                
            </ul>
            <p className="educationPeriod">
                {`${education.admissionYear}-${education.graduatedYear} ${convertValueToName("graduatedType",education.graduatedType)}`}
            </p>
            <p className="content">
                {education.educationContent}
            </p>
            <button className="btnModify" onClick={e => modifyEducation(e,education.index)}>
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <button className="btnRemove" onClick={e => removeEducation(e,education.index)}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
        </div>
    )
}

export default EducationContents;