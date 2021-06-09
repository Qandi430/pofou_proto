import React from 'react';
import { Form, Input, FormGroup, Col, } from 'reactstrap';
import { faFacebookF, faInstagram, faPinterestP, faTumblr, faTwitter, faVimeo } from '@fortawesome/free-brands-svg-icons';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noProfile from '../../../resources/images/contents/archive/noProfile.png';

const ProfileForm = ({profileForm,changeProfileForm,handleCategorySelectModal,handleWebAddressModal}) => {

    const getYearList = () => {
        let list = [];
        for(let i = 2021; i>=1900; i--){
            list.push(i);
        }
        return list;
    }

    const getDayList = () => {
        let list = [];
        for(let i = 1; i<=31; i++){
            list.push(i);
        }
        return list;
    }

    return(
        <Form>
            <h3 className="contentsTitle">나의 프로필 정보</h3>
            <div className="formItem profileImage">
                <h6 className="formTitle">프로필 사진</h6>
                <FormGroup>
                    <div className="imageWrap">
                        <img src={noProfile} alt="" className="img-fluid" />
                    </div>
                    <div className="inputWrap">
                        <div className="buttonWrap">
                            <input type="file" name="profileImage" id="profileImage"/>
                            <label htmlFor="profileImage" className="btnUpload"><FontAwesomeIcon icon={faUpload}/> 프로필 사진 업로드</label>
                            <button className="btnRemove">이미지 삭제</button>
                        </div>
                        <p>10MB 이내의 이미지 파일을 업로드 해주세요.</p>
                    </div>
                </FormGroup>
            </div>
            <div className="formItem profileName">
                <h6 className="formTitle">사용자 이름</h6>
                <FormGroup>
                    <Input type="text" name="name" value={profileForm.name} onChange={e => changeProfileForm("name",e.target.value)}/>
                </FormGroup>
            </div>
            <div className="formItem profileGender">
                <h6 className="formTitle">성별</h6>
                <FormGroup>
                    <div className="customRadio">
                        <input id='genderM' type='radio' value="M" name="gender" onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderM'>
                            <span></span>
                            남성
                            <ins><i>남성</i></ins>
                        </label>
                    </div>
                    <div className="customRadio">
                        <input id='genderF' type='radio' value="F" name="gender" onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderF'>
                            <span></span>
                            여성
                            <ins><i>여성</i></ins>
                        </label>
                    </div>
                    <div className="customRadio">
                        <input id='genderN' type='radio' value="None" name="gender" onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderN'>
                            <span></span>
                            선택안함
                            <ins><i>선택안함</i></ins>
                        </label>
                    </div>
                </FormGroup>
            </div>
            <div className="formItem profileBirth">
                <h6 className="formTitle">생년월일</h6>
                <FormGroup row>
                    <Col md={4}>
                        {/* <Input type="select">
                            {
                                getYearList().map(
                                    year => 
                                        <option key={year} value={year}>{year}</option>
                                )
                            }
                        </Input> */}
                        <select name="birthYear" onChange={e => changeProfileForm("birthYear",e.target.value)}>
                            {
                                getYearList().map(
                                    year => 
                                        <option key={year} value={year}>{year}</option>
                                )
                            }
                        </select>
                    </Col>
                    <Col md={4}>
                        <select type="select" name="birthMonth" onChange={e => changeProfileForm("birthYear",e.target.value)}>
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
                    </Col>
                    <Col md={4}>
                        <select type="select" name="birthDay" onChange={e => changeProfileForm("birthYear",e.target.value)}>
                            {
                                getDayList().map(
                                    year => 
                                        <option key={year} value={year}>{year}</option>
                                )
                            }
                        </select>
                    </Col>
                </FormGroup>
            </div>
            <div className="formItem profileMobile">
                <h6 className="formTitle">휴대폰 번호</h6>
                <FormGroup>
                    <Input type="text" name="mobile" value={profileForm.mobile} onChange={e => changeProfileForm("mobile",e.target.value)}/>
                </FormGroup>
            </div>
            <div className="formItem profileCategory">
                <h6 className="formTitle">작업분야 <button onClick={handleCategorySelectModal}>카테고리 설정 &gt;</button></h6>
                <ul>
                    {
                        profileForm.categoryList.length > 0 ?
                        "" :
                        <li>등록된 카테고리가 없습니다.</li>
                    }
                </ul>
            </div>
            <div className="formItem profileWebAddress">
                <h6 className="formTitle">웹사이트 <button onClick={handleWebAddressModal}>카테고리 설정 &gt;</button></h6>
                <ul>
                    <li className="hompage">
                        <a className={profileForm.webAddress.web === "" ? "empty" : ""} href={profileForm.webAddress.web === "#" ? "" : profileForm.webAddress.web}>
                            <FontAwesomeIcon icon={faHome}/>
                        </a>
                    </li>
                    <li className="facebook">
                        <a className={profileForm.webAddress.facebook === "" ? "empty" : ""} href={profileForm.webAddress.facebook === "#" ? "" : profileForm.webAddress.facebook}>
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </a>
                    </li>
                    <li className="twitter">
                        <a className={profileForm.webAddress.twitter === "" ? "empty" : ""} href={profileForm.webAddress.twitter === "#" ? "" : profileForm.webAddress.twitter}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                    </li>
                    <li className="pinterest">
                        <a className={profileForm.webAddress.pinterest === "" ? "empty" : ""} href={profileForm.webAddress.pinterest === "#" ? "" : profileForm.webAddress.pinterest}>
                            <FontAwesomeIcon icon={faPinterestP}/>
                        </a>
                    </li>
                    <li className="tumblr">
                        <a className={profileForm.webAddress.tumblr === "" ? "empty" : ""} href={profileForm.webAddress.tumblr === "#" ? "" : profileForm.webAddress.tumblr}>
                            <FontAwesomeIcon icon={faTumblr}/>
                        </a>
                    </li>
                    <li className="vimeo">
                        <a className={profileForm.webAddress.vimeo === "" ? "empty" : ""} href={profileForm.webAddress.vimeo === "#" ? "" : profileForm.webAddress.vimeo}>
                            <FontAwesomeIcon icon={faVimeo}/>
                        </a>
                    </li>
                    <li className="instagram">
                        <a className={profileForm.webAddress.instagram === "" ? "empty" : ""} href={profileForm.webAddress.instagram === "#" ? "" : profileForm.webAddress.instagram}>
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                    </li>
                </ul>
            </div>
            <button className="btnSubmit">변경 내용 저장</button>
        </Form>
    )
}

export default ProfileForm;