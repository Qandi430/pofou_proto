import React, { Fragment,useState } from 'react';
import { Form, Input, FormGroup, Col,Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import { faFacebookF, faInstagram, faPinterestP, faTumblr, faTwitter, faVimeo, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noProfile from '../../../resources/images/contents/archive/noProfile.png';

const ProfileForm = ({saveProfile,profileForm,changeProfileForm,handleCategorySelectModal,handleWebAddressModal,keywordList,blurOnUrl,toggleAvatarCreateModal,changeBeforeImage}) => {

    const [openUrlPrepend,setOpenUrlPrepend] = useState(false);
    const [urlPrepend,setUrlPrepend] = useState("/pofou.com/archive");

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

    const toggleUrlPrepend = () => {
        setOpenUrlPrepend(!openUrlPrepend)
    }

    const changeUrlPrepend = (prepend) => {
        setUrlPrepend(prepend)
    }

    return(
        <Form className="profileForm" onSubmit={saveProfile}>
            <h3 className="contentsTitle">나의 프로필 정보</h3>
            <div className="formItem profileImage">
                <h6 className="formTitle">프로필 사진</h6>
                <FormGroup>
                    <div className="imageWrap">
                        <img src={profileForm.profileImage === null ? noProfile : `https://storage.googleapis.com/pofou_repo/${profileForm.profileImage}`} alt="" className="img-fluid" />
                    </div>
                    <div className="inputWrap">
                        <div className="buttonWrap">
                            <input type="file" name="profileImage" id="profileImage" onChange={e => changeBeforeImage(e)}/>
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
                        <input id='genderM' type='radio' value="M" name="gender" checked={profileForm.gender === "M"} onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderM'>
                            <span></span>
                            남성
                            <ins><i>남성</i></ins>
                        </label>
                    </div>
                    <div className="customRadio">
                        <input id='genderF' type='radio' value="F" name="gender" checked={profileForm.gender === "F"} onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderF'>
                            <span></span>
                            여성
                            <ins><i>여성</i></ins>
                        </label>
                    </div>
                    <div className="customRadio">
                        <input id='genderN' type='radio' value="None" name="gender" checked={profileForm.gender === "N"} onChange={e => changeProfileForm("gender",e.target.value)}/>
                        <label htmlFor='genderN'>
                            <span></span>
                            선택안함
                            <ins><i>선택안함</i></ins>
                        </label>
                    </div>
                </FormGroup>
            </div>
            <div className="formItem profileUrl">
            <h6 className="formTitle">개인 URL</h6>
                <FormGroup>
                    <dl>
                        <dt>
                        <Dropdown isOpen={openUrlPrepend} toggle={toggleUrlPrepend}>
                            <DropdownToggle caret>{urlPrepend}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/archive")}>/pofou.com/archive</DropdownItem>
                                <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/resume")}>/pofou.com/resume</DropdownItem>
                                <DropdownItem onClick={() => changeUrlPrepend("/pofou.com/portfolio")}>/pofou.com/portfolio</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </dt>
                        <dd>
                            <input type="text" placeholder="영문,숫자,대시,언더바(최소 4자, 최대20자)" value={profileForm.url} onChange={e => changeProfileForm("url",e.target.value)} onBlur={e => blurOnUrl(e.target.value)}/>
                        </dd>
                    </dl>
                    <p style={{display:`${profileForm.url !== "" && profileForm.urlStatus !== "pass" ? "block" : "none"}`}}>
                        {profileForm.urlStatus === "irregular" ? "영문, 숫자, 대시, 언더바만 사용하여 4자 이상 20자 이내로 입력해주세요." : profileForm.urlStatus === "duplicate" ? "이미 사용중인 URL입니다." : ""}
                    </p>
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
                        <select name="birthYear" value={profileForm.birthYear} onChange={e => changeProfileForm("birthYear",e.target.value)}>
                            {
                                getYearList().map(
                                    year => 
                                        <option key={year} value={year}>{year}</option>
                                )
                            }
                        </select>
                    </Col>
                    <Col md={4}>
                        <select name="birthMonth" value={profileForm.birthMonth} onChange={e => changeProfileForm("birthMonth",e.target.value)}>
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
                        <select name="birthDay" value={profileForm.birthDay} onChange={e => changeProfileForm("birthDay",e.target.value)}>
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
            {
                profileForm.memberType === "client" &&
                <div className="formItem profileMobile">
                    <h6 className="formTitle">휴대폰 번호</h6>
                    <FormGroup>
                        <Input type="text" name="mobile" value={profileForm.mobile} onChange={e => changeProfileForm("mobile",e.target.value)}/>
                    </FormGroup>
                </div>
            }
            <div className="formItem profileKeyword">
                <h6 className="formTitle">작업분야 <button onClick={handleCategorySelectModal}>카테고리 설정 &gt;</button></h6>
                <ul>
                    {
                        profileForm.keyword1  === "" && profileForm.keyword2 === ""
                        ? <li>등록된 카테고리가 없습니다.</li>
                        : 
                        <Fragment>
                            {
                                profileForm.keyword1 !== null &&
                                <li>
                                    {
                                        (() => {
                                            if(keywordList !== null){
                                                const keyword = keywordList.find(key => key.code === profileForm.keyword1);
                                                if(keyword !== null && keyword !== undefined){
                                                    return keyword.kor;
                                                }else{
                                                    return profileForm.keyword1;
                                                }
                                            }else{
                                                return profileForm.keyword1;
                                            }
                                            
                                        })()
                                    }
                                </li>
                            }
                            {
                                profileForm.keyword2 !== null &&
                                <li>
                                    {
                                        (() => {
                                            if(keywordList !== null){
                                                const keyword = keywordList.find(key => key.code === profileForm.keyword2);
                                                if(keyword !== null && keyword !== undefined){
                                                    return keyword.kor;
                                                }else{
                                                    return profileForm.keyword2;
                                                }
                                            }else{
                                                return profileForm.keyword2;
                                            }
                                            
                                        })()
                                    }
                                </li>
                            }
                        </Fragment>
                    }
                </ul>
            </div>
            <div className="formItem profileWebAddress">
                <h6 className="formTitle">웹사이트 <button onClick={handleWebAddressModal}>카테고리 설정 &gt;</button></h6>
                <ul>
                    <li className="hompage">
                        <a className={profileForm.sns.homepage === "" ? "empty" : ""} href={profileForm.sns.homepage === "#" ? "" : profileForm.sns.web}>
                            <FontAwesomeIcon icon={faHome}/>
                        </a>
                    </li>
                    <li className="facebook">
                        <a className={profileForm.sns.facebook === "" ? "empty" : ""} href={profileForm.sns.facebook === "#" ? "" : profileForm.sns.facebook}>
                            <FontAwesomeIcon icon={faFacebookF}/>
                        </a>
                    </li>
                    <li className="twitter">
                        <a className={profileForm.sns.twitter === "" ? "empty" : ""} href={profileForm.sns.twitter === "#" ? "" : profileForm.sns.twitter}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                    </li>
                    <li className="pinterest">
                        <a className={profileForm.sns.pinterest === "" ? "empty" : ""} href={profileForm.sns.pinterest === "#" ? "" : profileForm.sns.pinterest}>
                            <FontAwesomeIcon icon={faPinterestP}/>
                        </a>
                    </li>
                    <li className="tumblr">
                        <a className={profileForm.sns.tumblr === "" ? "empty" : ""} href={profileForm.sns.tumblr === "#" ? "" : profileForm.sns.tumblr}>
                            <FontAwesomeIcon icon={faTumblr}/>
                        </a>
                    </li>
                    <li className="vimeo">
                        <a className={profileForm.sns.vimeo === "" ? "empty" : ""} href={profileForm.sns.vimeo === "#" ? "" : profileForm.sns.vimeo}>
                            <FontAwesomeIcon icon={faVimeo}/>
                        </a>
                    </li>
                    <li className="youtube">
                        <a className={profileForm.sns.youtube === "" ? "empty" : ""} href={profileForm.sns.youtube === "#" ? "" : profileForm.sns.youtube}>
                            <FontAwesomeIcon icon={faYoutube}/>
                        </a>
                    </li>
                    <li className="instagram">
                        <a className={profileForm.sns.instagram === "" ? "empty" : ""} href={profileForm.sns.instagram === "#" ? "" : profileForm.sns.instagram}>
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