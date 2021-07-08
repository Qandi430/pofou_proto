import { Container,Row,Col } from 'reactstrap';
import React from 'react';
import profileImage from '../../../../resources/images/template/profile.jpg';
import SkillBar from 'react-skillbars';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = ({designMode,data,toggleTitleConfigModal,toggleSkillConfigModal,togglePrivacyConfigModal}) => {

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
        <div className={`about ${designMode ? "designMode" : ""}`}>
            <Container>
                <h3 className={`title`} style={{color : `${data.title.color}`,textAlign:`${data.title.textAlign}`}}>
                    <span dangerouslySetInnerHTML={{__html: data.title.text }}/>
                    {
                        designMode &&
                        <button onClick={() => toggleTitleConfigModal("about")}>
                            <FontAwesomeIcon icon={faCog}/>
                        </button>
                    }
                </h3>
                <Row className="contentsWrap">
                    <Col md="3" className="privacy">
                        <div className="profileImage" style={{position:"relative"}}>
                            {
                                designMode ? 
                                <div>
                                    <img src={profileImage} alt="" className="img-fluid"/>
                                    <label htmlFor="profileInput"><FontAwesomeIcon icon={faCog}/></label>
                                    <input type="file" id="profileInput" style={{display:"none"}}/>
                                </div>
                                : 
                                <img src={profileImage} alt="" className="img-fluid"/>
                            }
                            
                        </div>
                        <div className="privacyList">
                            {
                                data.privacy.info.name !== "" && data.privacy.displayName &&
                                <dl className="name">
                                    <dt>이름</dt>
                                    <dd>{data.privacy.info.name}</dd>
                                </dl>
                            }
                            {
                                (data.privacy.info.birthYear !== "" && data.privacy.info.birthMonth !== "" && data.privacy.info.birthDay !== "") && data.privacy.displayBirthDate &&
                                <dl className="name">
                                    <dt>생년월일</dt>
                                    <dd>{`${data.privacy.info.birthYear}.${data.privacy.info.birthMonth}.${data.privacy.info.birthDay}`} (만 31세)</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.gender !== "" && data.privacy.displayGender &&
                                <dl className="name">
                                    <dt>성별</dt>
                                    <dd>{data.privacy.info.gender === "M" ? "남" : "여"}</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.gender !== "" && data.privacy.displayGender &&
                                <dl className="name">
                                    <dt>성별</dt>
                                    <dd>{data.privacy.info.gender === "M" ? "남" : "여"}</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.phone !== "" && data.privacy.displayPhone &&
                                <dl className="name">
                                    <dt>전화번호</dt>
                                    <dd>{data.privacy.info.phone}</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.mobile !== "" && data.privacy.displayMobile &&
                                <dl className="name">
                                    <dt>휴대전화번호</dt>
                                    <dd>{data.privacy.info.mobile}</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.email !== "" && data.privacy.displayEmail &&
                                <dl className="name">
                                    <dt>이메일</dt>
                                    <dd>{data.privacy.info.email}</dd>
                                </dl>
                            }
                            {
                                data.privacy.info.address !== "" && data.privacy.displayAddress &&
                                <dl className="name">
                                    <dt>주소</dt>
                                    <dd>{data.privacy.info.address}</dd>
                                </dl>
                            }
                            {
                                designMode  &&
                                <button onClick={togglePrivacyConfigModal}>
                                    <FontAwesomeIcon icon={faCog}/>
                                </button>
                            }
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
                        <div className="skilListWrap">
                            <SkillBar  skills={data.skill.skillList} height={20}/>
                            {
                                designMode &&
                                <button onClick={toggleSkillConfigModal}><FontAwesomeIcon icon={faCog}/></button>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;