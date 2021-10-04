import React from 'react'

const Education = ({education}) => {

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
        <div className="education contents">
            <div className="titleBox">
                <h5 className="title">학력</h5>
            </div>
            <div className="educationList flexTable">
                <div className="thead">
                    <div className="tr">
                        <div className="th period">재학기간</div>
                        <div className="th graduatedType">구분</div>
                        <div className="th eductionName">학교명(소재지)</div>
                        <div className="th major">전공</div>
                    </div>
                </div>
                <div className="tbody">
                    {
                        education.map(
                            (edu,index) => 
                                <div className="tr" key={index}>
                                    <div className="td period">{edu.admissionYear} - {edu.graduatedYear}</div>
                                    <div className="td graduatedType">
                                        {(() => {
                                            switch(edu.graduatedType){
                                                case "graduate":
                                                    return "졸업";
                                                case "enrollment":
                                                    return "재학";
                                                case "semesterOff":
                                                    return "휴학";
                                                case "dropOut":
                                                    return "중퇴";
                                                default :
                                                    return edu.graduatedType;
                                            }
                                        })()}
                                    </div>
                                    <div className="td eductionName">{edu.educationName}</div>
                                    <div className="td major">
                                        <ul>
                                            {
                                                edu.educationType === "univercity" ?
                                                edu.majorList.map(
                                                    (major,index) => 
                                                    <li key={index}>{major.majorName} {convertValueToName("majorType",major.majorType)} ({convertValueToName("degreeType",major.degreeType)})</li>
                                                )
                                                :
                                                <li>{convertValueToName("majorType",edu.majorList[0].majorType)}</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Education
