import React from 'react';
import { Form, FormGroup } from 'reactstrap';
import defaultImage from '../../../resources/images/contents/resume/default_profile.png'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResumeFormContents = ({openTitleInput,resumeTitle,changeFormData,handleTitleInput}) => {


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
                    <input type="text" id="resumeTitle" name="resumeTitle" value={resumeTitle} onChange={changeFormData} />
                    <button onClick={handleTitleInput}>적용</button>
                    </>
                    :
                    <h5>
                        {resumeTitle}
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
                                <label htmlFor="">이름</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="name" />
                            </div>
                        </div>
                        <div className="tableData birthDate">
                            <div className="th">
                                <label htmlFor="">생년월일</label>
                            </div>
                            <div className="td">
                                <select name="birthYead">
                                    {
                                        getYearList().map(
                                            (year,index) => 
                                                <option key={index} value={year}>{year}</option>
                                        )
                                    }
                                </select>
                                <select name="birthMonth">
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
                                <select name="birthDay">
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
                                <label htmlFor="">성별</label>
                            </div>
                            <div className="td">
                                <select name="gender">
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData phone">
                            <div className="th">
                                <label htmlFor="">전화번호</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="phone" />
                            </div>
                        </div>
                        <div className="tableData mobile">
                            <div className="th">
                                <label htmlFor="">휴대폰번호</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="phone" />
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData email">
                            <div className="th">
                                <label htmlFor="">이메일</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="phone" />
                            </div>
                        </div>
                        <div className="tableData mobile">
                            <div className="th">
                                <label htmlFor="">SNS</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="phone" />
                            </div>
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableData phone">
                            <div className="th">
                                <label htmlFor="">주소</label>
                            </div>
                            <div className="td">
                                <input type="text" id="basicName" name="phone" />
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>
        </Form>
    )
}

export default ResumeFormContents;