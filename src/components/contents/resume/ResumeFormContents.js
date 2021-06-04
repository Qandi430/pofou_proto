import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import defaultImage from '../../../resources/images/contents/resume/default_profile.png'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EducationContents from './EducationContent';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ResumeFormContents = ({openTitleInput,changeFormData,handleTitleInput,formData,handleEducationAdditionalModal,removeEducation,modifyEducation,modifyEducationForm,addCertificateList,changteCertificateData,handleCertificateSearchModal}) => {

    const getYearList = () => {
        let list = [];
        for(let i = 1900; i<=2021; i++){
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
        </Form>
    )
}

export default ResumeFormContents;