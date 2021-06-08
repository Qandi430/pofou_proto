import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import defaultImage from '../../../resources/images/contents/resume/default_profile.png'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EducationContents from './EducationContent';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const ResumeFormContents = ({
    openTitleInput
    ,changeFormData
    ,handleTitleInput
    ,formData
    ,handleEducationAdditionalModal
    ,removeEducation
    ,modifyEducation
    ,modifyEducationForm
    ,addCertificateList
    ,changteCertificateData
    ,handleCertificateSearchModal
    ,handleCareerAdditionalModal
    ,modifyCareer
    ,removeCareer
    ,changePreferredData
    ,handleAwardsAdditionalModal
    ,modifyAwards
    ,removeAwards
    ,handExperienceAddiionalModal
    ,modifyExperience
    ,removeExperience
}) => {
    const getYearList = () => {
        let list = [];
        for(let i = 2021; i>=1900; i--){
            list.push(i);
        }
        return list;
    }

    const getDayList = () => {
        let list = [];
        
        for(let i = 1; i<= 31; i++){
            list.push(i)
        }

        return list;
    }
    
    return (
        <Form>
            <div className="resumeTitle">
                {
                    openTitleInput ? 
                    <>
                    <input type="text" id="resumeTitle" name="title" value={formData.title} onChange={changeFormData} />
                    <button onClick={handleTitleInput}>적용</button>
                    </>
                    :
                    <h5>
                        {formData.title}
                        <button onClick={handleTitleInput}><FontAwesomeIcon icon={faEdit}/></button>
                    </h5>
                }
            </div>
            <FormGroup className="basicInfo">
                <h6 className="formTitle">기본정보 <span>입력하신 정보는 절대 사용자 동의 없이 외두로 유출, 공개되지 않습니다.</span></h6>
                <div className="resumeImage">
                    <div className="imageWrap">
                        <img src={defaultImage} alt="" className="img-fluid"/>
                    </div>
                    <button>이미지 수정하기</button>
                </div>
                <div className="flexTable form">
                    <div className="tableRow">
                        <div className="tableData name">
                            <div className="th">
                                <label htmlFor="resumeName">이름</label>
                            </div>
                            <div className="td">
                                <input type="text" id="resumeName" name="name" value={formData.name} onChange={changeFormData} />
                            </div>
                        </div>
                        <div className="tableData birthDate">
                            <div className="th">
                                <label htmlFor="birthYear">생년월일</label>
                            </div>
                            <div className="td">
                                <select name="birthYear" id="birthYear" onChange={changeFormData}>
                                    {
                                        getYearList().map(
                                            (year,index) => 
                                                <option key={index} value={year}>{year}</option>
                                        )
                                    }
                                </select>
                                <select name="birthMonth" id="birthMonth" onChange={changeFormData}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select name="birthDay" id="birthDay" onChange={changeFormData}>
                                    {
                                        getDayList().map(
                                            (day,index) => 
                                                <option key={index} value={day}>{day}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="tableData gender">
                            <div className="th">
                                <label htmlFor="gender">성별</label>
                            </div>
                            <div className="td">
                                <select name="gender" id="gender" onChange={changeFormData}>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData phone">
                            <div className="th">
                                <label htmlFor="phone">전화번호</label>
                            </div>
                            <div className="td">
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={changeFormData} />
                            </div>
                        </div>
                        <div className="tableData mobile">
                            <div className="th">
                                <label htmlFor="mobile">휴대폰번호</label>
                            </div>
                            <div className="td">
                                <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={changeFormData}/>
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData email">
                            <div className="th">
                                <label htmlFor="email">이메일</label>
                            </div>
                            <div className="td">
                                <input type="text" id="email" name="email" value={formData.email} onChange={changeFormData}/>
                            </div>
                        </div>
                        <div className="tableData sns">
                            <div className="th">
                                <label htmlFor="sns">SNS</label>
                            </div>
                            <div className="td">
                                <input type="text" id="sns" name="sns" value={formData.sns} onChange={changeFormData}/>
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData address">
                            <div className="th">
                                <label htmlFor="address">주소</label>
                            </div>
                            <div className="td">
                                <input type="text" id="address" name="address" value={formData.address} onChange={changeFormData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <FormGroup className="education">
                <h6 className="formTitle">
                    학력 <button onClick={handleEducationAdditionalModal}>추가 +</button>
                </h6>
                <div className="educationList">
                    {
                        formData.educationList.length > 0 ?
                        formData.educationList.map(
                            (education,index) => <EducationContents education={education} key={index} removeEducation={removeEducation} modifyEducation={modifyEducation} modifyEducationForm={modifyEducationForm}/>
                        )
                        :
                        <div className="empty">
                            등록된 학력이 없습니다.
                            <button onClick={handleEducationAdditionalModal}>학력 등록하기</button>
                        </div>
                    }
                </div>
            </FormGroup>
            <FormGroup className="certificate">
                <h6 className="formTitle">자격/면허 <button onClick={addCertificateList}>추가 +</button></h6>
                <div className="certificateList">
                    {
                        formData.certificateList.length > 0 ?
                            formData.certificateList.map(
                                (certificate) => 
                                    <div className="certificateContent" key={certificate.index}>
                                        <dl>
                                            <dt>이름</dt>
                                            <dd>
                                                <Button color="default" onClick={e => handleCertificateSearchModal(e,certificate.index)}>검색</Button>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>발행처/기관</dt>
                                            <dd><input type="text" name="certificateIssuer" value={certificate.certificateIssuer} onChange={e => changteCertificateData("certificateIssuer",e.target.value,certificate.index)}/></dd>
                                        </dl>
                                        <dl>
                                            <dt>등급</dt>
                                            <dd><input type="text" name="certificateGrade" value={certificate.certificateGrade} onChange={e => changteCertificateData("certificateGrade",e.target.value,certificate.index)}/></dd>
                                        </dl>
                                        <dl>
                                            <dt>발행일</dt>
                                            <dd>
                                                <DatePicker
                                                    selected={certificate.certificateIssueDate}
                                                    selectsStart
                                                    maxDate={new Date()}
                                                    dateFormat="yyyy.MM.dd"
                                                    onChange={data=> changteCertificateData("certificateIssueDate",data,certificate.index)}
                                                />
                                            </dd>
                                        </dl>
                                        <button className="btnRemoveCertificate">삭제하기</button>
                                    </div>
                            ) 
                        : 
                        <div className="empty">
                            등록된 자격/면허가 없습니다.
                            <button onClick={addCertificateList}>자격/면허 등록하기</button>
                        </div>
                    }
                </div>
            </FormGroup>
            <FormGroup className="career">
                <h6 className="formTitle">
                    경력 <button onClick={handleCareerAdditionalModal}>추가 +</button>
                </h6>
                <div className="careerList">
                    {
                        formData.carrerList.length > 0 ?
                            formData.carrerList.map(
                                career => 
                                    <div className="careerContent" key={career.index}>
                                        <h4 className="careerRole">{career.careerRole}</h4>
                                        <p className="careerName">{career.careerName}</p>
                                        <p className="careerPeriod">{`${career.careerStartYear}년 ${career.careerStartMonth}월 - ${career.careerPeriodType === "workOn" ? "현재" : `${career.careerEndYear}년 ${career.careerEndMonth}월`}`}</p>
                                        <p className="content">{career.careerContent}</p>
                                        <button className="btnModify" onClick={e => modifyCareer(e,career.index)}>
                                            <FontAwesomeIcon icon={faPen}/>
                                        </button>
                                        <button className="btnRemove" onClick={e => removeCareer(e,career.index)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </button>
                                    </div>
                            )
                            :
                            <div className="empty">
                                등록된 경력이 없습니다.
                                <button onClick={handleCareerAdditionalModal}>경력 등록하기</button>
                            </div>
                    }
                </div>
            </FormGroup>
            <FormGroup className="language">
                <h6 className="formTitle">어학(어학 시험관련 필요 여부)</h6>
                <ul className="languageList"></ul>
            </FormGroup>
            <FormGroup className="awards">
                <h6 className="formTitle">수상 <button onClick={handleAwardsAdditionalModal}>추가 +</button></h6>
                <div className="awardsList">
                    {
                        formData.awardsList.length > 0 ?
                            formData.awardsList.map(
                                (awards) => 
                                    <div className="awardsContent">
                                        <h4 className="awardsName">
                                            {awards.awardsName} {awards.awardsPrize}
                                        </h4>
                                        <p className="awardsAgency">{awards.awardsAgency}</p>
                                        <p className="awardsDate">{`${awards.awardsYear}년 ${awards.awardsMonth}월 수상`}</p>
                                        <div className="content">{awards.awardsContent}</div>
                                        <button className="btnModify" onClick={e => modifyAwards(e,awards.index)}>
                                            <FontAwesomeIcon icon={faPen}/>
                                        </button>
                                        <button className="btnRemove" onClick={e => removeAwards(e,awards.index)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </button>
                                    </div>
                            )
                        :
                        <div className="empty">
                            등록된 수상 내역이 없습니다.
                            <button onClick={handleAwardsAdditionalModal}>수상내역 등록하기</button>
                        </div>
                    }
                </div>
            </FormGroup>
            <FormGroup className="abroads">
                <h6 className="formTitle">해외 연수(필요 여부?)</h6>
                <ul className="abroadsList"></ul>
            </FormGroup>
            <FormGroup className="preferred">
                <h6 className="formTitle">우대사항</h6>
                <ul className="preferredItems">
                    <li className="veteran">
                        <dl>
                            <dt>
                                보훈 사항
                            </dt>
                            <dd>
                                <input type="radio" name="veteran" value="Y" id="veteranY" onChange={changePreferredData}/>
                                <label htmlFor="veteranY">대상</label>
                                <input type="radio" name="veteran" value="N" id="veteranN" onChange={changePreferredData}/>
                                <label htmlFor="veteranN">비대상</label>
                            </dd>
                        </dl>
                    </li>
                    <li className="disabledWhether">
                        <dl>
                            <dt>
                                장애 여부
                            </dt>
                            <dd>
                                <input type="radio" name="disabledWhether" value="Y" id="disabledWhetherY" onChange={changePreferredData}/>
                                <label htmlFor="disabledWhetherY">대상</label>
                                <input type="radio" name="disabledWhether" value="N" id="disabledWhetherN" onChange={changePreferredData}/>
                                <label htmlFor="disabledWhetherN">비대상</label>
                            </dd>
                        </dl>
                    </li>
                    <li className="militaryServiceStatus">
                        <dl>
                            <dt>
                                병역 구분
                            </dt>
                            <dd>
                                <input type="radio" name="militaryServiceStatus" value="Fulfilled" id="fulfilled" onChange={changePreferredData}/>
                                <label htmlFor="fulfilled">대상</label>
                                <input type="radio" name="militaryServiceStatus" value="Unfulfilled" id="unfulfilled" onChange={changePreferredData}/>
                                <label htmlFor="unfulfilled">비대상</label>
                                <input type="radio" name="militaryServiceStatus" value="Exempted" id="exempted" onChange={changePreferredData}/>
                                <label htmlFor="exempted">비대상</label>
                            </dd>
                        </dl>
                    </li>
                    <li className="militatyServicePeriod">
                        <dl>
                            <dt>
                                복무기간
                            </dt>
                            <dd>
                                <select name="militaryStartYear" id="militaryStartYear" onChange={changePreferredData}>
                                    <option value="">--</option>
                                    {
                                        getYearList().map(
                                            (year,index) => 
                                                <option key={index} value={year}>{year}</option>
                                        )
                                    }
                                </select>
                                <select name="militaryStartMonth" id="militaryStartMonth" onChange={changePreferredData}>
                                    <option value="">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <label htmlFor="militaryEndYear">-</label>
                                <select name="militaryEndYear" id="militaryEndYear" onChange={changePreferredData}>
                                    <option value="">--</option>
                                    {
                                        getYearList().map(
                                            (year,index) => 
                                                <option key={index} value={year}>{year}</option>
                                        )
                                    }
                                </select>
                                <select name="militaryEndMonth" id="militaryEndMonth" onChange={changePreferredData}>
                                    <option value="">--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </dd>
                        </dl>
                    </li>
                    <li className="mos">
                        <dl>
                            <dt>군별</dt>
                            <dd>
                                <input type="text" name="mos" value={formData.preferred.mos} onChange={changePreferredData}/>
                            </dd>
                        </dl>
                    </li>
                    <li className="militaryClasses">
                        <dl>
                            <dt>계급</dt>
                            <dd>
                                <input type="text" name="militaryClasses" value={formData.preferred.militaryClasses} onChange={changePreferredData}/>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </FormGroup>
            <FormGroup className="experience">
                <h6 className="formTitle">관련활동 및 사회경험 <button onClick={handExperienceAddiionalModal}>추가 +</button></h6>
                <div className="experienceList">
                    {
                        formData.experienceList.length > 0 ?
                            formData.experienceList.map(
                                experience => 
                                    <div className="experienceContent" key={experience.index}>
                                        <h4 className="experienceName">{experience.experienceName}</h4>
                                        <p className="experienceInstitution">{experience.experienceInstitution}</p>
                                        <p className="experiencePeriod">{`${moment(experience.experienceStartDate).format('YYYY.MM.DD')} - ${moment(experience.experienceEndDate).format('YYYY.MM.DD')}`}</p>
                                        <p className="content">{experience.experienceContent}</p>
                                        <button className="btnModify" onClick={e => modifyExperience(e,experience.index)}>
                                            <FontAwesomeIcon icon={faPen}/>
                                        </button>
                                        <button className="btnRemove" onClick={e => removeExperience(e,experience.index)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </button>
                                    </div>
                            )
                        :
                        <div className="empty">
                            등록된 관련활동 및 사회경험이 없습니다.
                            <button onClick={handExperienceAddiionalModal}>관련활동 또는 사회경험 등록하기</button>
                        </div>
                    }
                </div>                            
            </FormGroup>
        </Form>
    )
}

export default ResumeFormContents;