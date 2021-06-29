import { Container,Row,Col } from 'reactstrap';
import React from 'react';
import profileImage from '../../../../resources/images/template/profile.jpg';
import SkillBar from 'react-skillbars';
const About = ({data}) => {

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
        <div className="about">
            <Container>
                <h3 className="title">
                    ABOUT
                </h3>
                <Row className="contentsWrap">
                    <Col md="3" className="privacy">
                        <div className="profileImage">
                            <img src={profileImage} alt="" className="img-fluid"/>
                        </div>
                        <div className="privacyList">
                            <dl className="name">
                                <dt>이름</dt>
                                <dd>이승재</dd>
                            </dl>
                            <dl className="name">
                                <dt>생년월일</dt>
                                <dd>1990.04.30 (만 31세)</dd>
                            </dl>
                            <dl className="name">
                                <dt>성별</dt>
                                <dd>남</dd>
                            </dl>
                            <dl className="name">
                                <dt>휴대전화번호</dt>
                                <dd>010.6476.3871</dd>
                            </dl>
                        </div>
                    </Col>
                    <Col md={{size: 3, offset : 1}} className="education">
                        <ul className="educationList">
                            {
                                data.educationList.map(
                                    education => 
                                        <li className="educationContent" key={education.index}>
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
                                        </li>
                                )
                            }
                        </ul>
                    </Col>
                    <Col md={{size: 4, offset : 1}} className="skill">
                        <SkillBar  skills={data.skillList} height={20}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;