import React, { Fragment, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import {Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const DetailItem = ({openDetailItemList,toggleOpenDetailItem,contents,modifyContents,saveHistory}) => {

    const modifyDetailItem = (contents) => {
        modifyContents(contents);
        saveHistory("modifyContents");
    }

    return(
        <div className={`detailItem`}>
            <h5 onClick={() => toggleOpenDetailItem(contents.index)}>{`${contents.index+1}. ${contents.name}`}</h5>
            <div className={`panel ${openDetailItemList.indexOf(contents.index) > -1 ? "on":""}`}>
                <div className="panelWrap">
                    {
                        contents.type === "profile" &&
                            <ProfileForm contents={contents} modifyContents={modifyDetailItem}/>
                    }
                    {
                        contents.type === "skillList" &&
                            <SkillForm contents={contents} modifyContents={modifyDetailItem}/>
                    }
                    {
                        contents.type === "title" &&
                            <TitleForm/>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailItem;

const ProfileForm = ({contents,modifyContents}) => {
    
    const togglePrivacyInfo = e => {
        contents.privacy[e.target.name] = e.target.checked;
        modifyContents(contents);
    }

    return(
        <div className="detailForm profileForm">
            <dl>
                <dt>이름</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayName${contents.index}`} type="checkbox" checked={contents.privacy.displayName} name="displayName" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayName${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>생년월일</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayBirthDate${contents.index}`} type="checkbox" checked={contents.privacy.displayBirthDate} name="displayBirthDate" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayBirthDate${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>성별</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayGender${contents.index}`} type="checkbox" checked={contents.privacy.displayGender} name="displayGender" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayGender${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayPhone${contents.index}`} type="checkbox" checked={contents.privacy.displayPhone} name="displayPhone" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayPhone${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>휴대전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayMobile${contents.index}`} type="checkbox" checked={contents.privacy.displayMobile} name="displayMobile" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayMobile${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>이메일</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayEmail${contents.index}`} type="checkbox" checked={contents.privacy.displayEmail} name="displayEmail" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayEmail${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>주소</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayAddress${contents.index}`} type="checkbox" checked={contents.privacy.displayAddress} name="displayAddress" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayAddress${contents.index}`}></label>
                </dd>
            </dl>
        </div>
    )
}

const historyForm = () => {

}

const SkillForm = ({contents,modifyContents}) => {

    const changeColors = (name,value) => {
        if(name === "bar"){
            contents.skill.colors.bar = value;
        }else{
            contents.skill.colors.title[name] = value;
        }
        modifyContents(contents);
    }

    const changeListItem = (index,name,value) => {
        contents.skill.list = contents.skill.list.map(
            (s,i) => 
                i === index ? {...s,[name] : value} : s
        )
        modifyContents(contents);
    }

    const removeListItem = index => {
        contents.skill.list = contents.skill.list.filter((s,i) => i !== index);
        modifyContents(contents);
    }
    
    const setList = (newList) => {
        contents.skill.list = newList;
        modifyContents(contents);
    }

    const addSkill = () => {
        contents.skill.list = contents.skill.list.concat({type : "",level : 0});        
        modifyContents(contents);
    }

    return(
        <div className="detailForm skillForm">
            <dl>
                <dt>스킬명 배경색</dt>
                <dd>
                    <label htmlFor="skillTitleBgColor" style={{backgroundColor:`${contents.skill.colors.title.background}`}} /> 
                    <input type="color" id="skillTitleBgColor" value={contents.skill.colors.title.background} onChange={e => changeColors("background",e.target.value)}/>
                </dd>
            </dl>
            <dl>
                <dt>스킬명 글색</dt>
                <dd>
                    <label htmlFor="skillTitleColor" style={{backgroundColor:`${contents.skill.colors.title.text}`}} /> 
                    <input type="color" id="skillTitleColor" value={contents.skill.colors.title.text} onChange={e => changeColors("text",e.target.value)}/>
                </dd>
            </dl>
            <dl>
                <dt>스킬바 색상</dt>
                <dd>
                    <label htmlFor="skillBarColor" style={{backgroundColor:`${contents.skill.colors.bar}`}} /> 
                    <input type="color" id="skillBarColor" value={contents.skill.colors.bar} onChange={e => changeColors("bar",e.target.value)}/>
                </dd>
            </dl>
            <ReactSortable list={contents.skill.list} setList={newList => setList(newList)} style={{padding: "5px 10px"}}>
                {
                    contents.skill.list.map(
                        (skill,index) => (
                            <div key={index} style={{display:"flex",alignItems:"center",marginTop:"10px"}}>
                                <span style={{cursor:"pointer"}}><FontAwesomeIcon icon={faBars}/></span>
                                <Input type="text" value={skill.type} onChange={e => changeListItem(index,"type",e.target.value)} style={{flex:"0 0 40%",marginLeft:"10px"}} placeholder="기술명 : 예)포토샵"/>
                                <Input type="number" min="0" max="100" value={skill.level} onChange={e => changeListItem(index,"level",e.target.value)} style={{flex:"0 0 40%",marginLeft:"10px"}} placeholder="점수 : 예)100"/>
                                <button onClick={() => removeListItem(index)} style={{marginLeft:"auto",backgroundColor:"transparent",color:"#ff0000"}}><FontAwesomeIcon icon={faTimes}/></button>
                            </div>
                        )
                    )
                }
            </ReactSortable>
            <button className="btnAdd" onClick={addSkill}><FontAwesomeIcon icon={faPlus}/> 추가</button>
        </div>
    )
};

const TitleForm = () => {
    return (
        <div>
            asdf
        </div>
    )
}