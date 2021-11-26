import React,{useState} from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import defaultImage from '../../../resources/images/contents/resume/default_profile.png';
import ReactDatePicker from 'react-datepicker';
import DaumPostModal from '../../common/DaumPostModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCameraRetro, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PhotoEditModal from './PhotoEditModal';
import { getMonth, getYear } from 'date-fns';
// import {range} from 'react-lodash';
const _ = require("lodash");
const BasicInfo = ({
    changeFormData
    ,formData
    ,setFormData
    ,toggleSpinnerModal
}) => {
    const [openDaumPostModal,setOpenDaumPostModal] = useState(false);
    const [beforeImage,setBeforeImage] = useState(null);

    const toggleDaumPostModal = () => {
        setOpenDaumPostModal(!openDaumPostModal);
    }

    const setAddress = (data) => {
        setFormData({...formData,zipCode:data.zonecode,baseAddress:data.address})
        toggleDaumPostModal();
    }

    const changeBeforeImage = (e,file) => {
        if(file !== undefined){
            setBeforeImage(e);
            // console.log(e);
        }else{
            setBeforeImage(e.target.files[0]);
        }    
    }

    const closePhotoEditModal = () => {
        setBeforeImage(null);
        document.getElementById("uploadPhoto").value = "";
    }

    const years = _.range(1950, getYear(new Date()) + 1, 1);
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']; 

    return(
        <FormGroup className="basicInfo">
            <h6 className="formTitle">기본정보 <span>입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.</span></h6>
            {/* <div className="resumeImage">
                <div className="imageWrap">
                    <img src={defaultImage} alt="" className="img-fluid"/>
                </div>
                <button>이미지 수정하기</button>
            </div> */}
            
            <div className="basicContent">
                <FormGroup className="photo">
                    <div className="imageWrap">
                        <img src={formData.photo === "" ? defaultImage : `https://storage.googleapis.com/pofou_repo/${formData.photo}`} alt="" className="img-fluid"/>
                        <label htmlFor="uploadPhoto">
                            <FontAwesomeIcon icon={faCameraRetro}/>
                        </label>
                        <input type="file" id="uploadPhoto" style={{display:"none"}} onChange={changeBeforeImage} accept="image/jpg, image/jpeg, image/png"/>
                    </div>
                    <div className={`displayBox ${formData.displayPhoto ? "display" : ""}`}>
                        <label htmlFor="displayPhotoTrue">
                            공개
                            <input type="radio" id="displayPhotoTrue" name="displayPhoto" value="true"  onChange={e => changeFormData("displayPhoto",true)}/>
                        </label>
                        <label htmlFor="displayPhotoFalse">
                            비공개
                            <input type="radio" id="displayPhotoFalse" name="displayPhoto" value="false"  onChange={e => changeFormData("displayPhoto",false)}/>
                        </label>
                    </div>
                </FormGroup>
                <FormGroup className="name">
                    <Label>이름 <span>필수</span></Label>
                    <div className="inputBox">
                        <Input type="text" name="name" value={formData.name} onChange={e => changeFormData("name",e.target.value)} placeholder="이름입력"/>
                    </div>
                </FormGroup>
                <FormGroup className="birthDate">
                    <Label>생년월일 <span>필수</span></Label>
                    <div className="inputBox">
                        <ReactDatePicker
                            selected={formData.birthDate}
                            onChange={(date) => changeFormData("birthDate",date)}
                            locale="ko"
                            dateFormat="yyyyMMdd"
                            placeholderText="YYYYMMDD"
                            maxDate={new Date()}
                            className="form-control"
                            renderCustomHeader={({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                            }) => (
                                <div className="datePickerHeader fullDay">
                                    <button type="button" className="btnPrev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                    <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                        {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                        ))}
                                    </select>

                                    <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                        changeMonth(months.indexOf(value))
                                        }
                                    >
                                        {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                        ))}
                                    </select>

                                    <button onClick={increaseMonth} type="button" className="btnNext" disabled={nextMonthButtonDisabled}>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </button>
                                </div>
                            )}
                        />
                        <div className="genderBox">
                            <Label htmlFor="resumeGenderM" className={formData.gender === "M" ? "on" : ""}>
                                남
                                <input type="radio" name="gender" value="M" id="resumeGenderM" onChange={e => changeFormData("gender",e.target.value)}/>
                            </Label>
                            <Label htmlFor="resumeGenderF" className={formData.gender === "F" ? "on" : ""}>
                                여
                                <input type="radio" name="gender" value="F" id="resumeGenderF" onChange={e => changeFormData("gender",e.target.value)}/>
                            </Label>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup className="email">
                    <Label>이메일 <span>필수</span></Label>
                    <div className="inputBox">
                        <Input type="email" name="email" value={formData.email} onChange={e => changeFormData(e.target.name,e.target.value)} placeholder="이메일 입력"/>
                    </div>
                </FormGroup>
                <FormGroup className="mobile">
                    <Label>휴대폰 <span>필수</span></Label>
                    <div className="inputBox">
                        <Input type="text" className="onlyNumber" name="mobile" value={formData.mobile}  onChange={e => changeFormData(e.target.name,e.target.value)} placeholder="휴대전화번호 입력"/>
                    </div>
                </FormGroup>
                <FormGroup className="phone">
                    <Label>전화번호</Label>
                    <div className="inputBox">
                        <Input type="text" className="onlyNumber" name="phone" value={formData.phone}  onChange={e => changeFormData(e.target.name,e.target.value)} placeholder="전화번호 입력"/>
                    </div>
                </FormGroup>
                <FormGroup className="address">
                    <Label>주소 <span>필수</span></Label>
                    <div className="inputBox">    
                        <Input type="text" name="baseAddress" value={formData.baseAddress} onClick={toggleDaumPostModal} readOnly placeholder="기본주소"/>
                        <Input type="text" name="detailAddress" value={formData.detailAddress} onChange={e => changeFormData(e.target.name,e.target.value)} placeholder="상세주소 입력"/>
                    </div>
                </FormGroup>
            </div>
            <DaumPostModal openDuamPostModal={openDaumPostModal} toggleDaumPostModal={toggleDaumPostModal} completeFunction={setAddress}/>
            <PhotoEditModal beforeImage={beforeImage} toggleSpinnerModal={toggleSpinnerModal} saveImage={changeFormData} closePhotoEditModal={closePhotoEditModal}/>
        </FormGroup>
    )
}

export default BasicInfo;