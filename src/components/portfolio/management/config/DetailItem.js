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
                            <ProfileForm contents={contents} modifyContents={modifyContents} saveHistory={saveHistory}/>
                    }
                    {
                        contents.type === "skillList" &&
                            <SkillForm contents={contents} modifyContents={modifyContents} saveHistory={saveHistory}/>
                    }
                    {
                        contents.type === "history" &&
                            <HistoryForm contents={contents} modifyContents={modifyContents} saveHistory={saveHistory}/>
                    }
                    {
                        contents.type === "work" &&
                            <WorkForm contents={contents} modifyContents={modifyContents} saveHistory={saveHistory}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailItem;

const ProfileForm = ({contents,modifyContents,saveHistory}) => {
    
    const togglePrivacyInfo = async (e) => {
        contents.profile[e.target.name] = e.target.checked;
        await modifyContents(contents);
        saveHistory(e.target.name)
    }

    return(
        <div className="detailForm profileForm">
            <dl>
                <dt>사진</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayPhoto${contents.index}`} type="checkbox" checked={contents.profile.displayPhoto} name="displayPhoto" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayPhoto${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>이름</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayName${contents.index}`} type="checkbox" checked={contents.profile.displayName} name="displayName" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayName${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>생년월일</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayBirthDate${contents.index}`} type="checkbox" checked={contents.profile.displayBirthDate} name="displayBirthDate" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayBirthDate${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>성별</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayGender${contents.index}`} type="checkbox" checked={contents.profile.displayGender} name="displayGender" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayGender${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayPhone${contents.index}`} type="checkbox" checked={contents.profile.displayPhone} name="displayPhone" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayPhone${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>휴대전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayMobile${contents.index}`} type="checkbox" checked={contents.profile.displayMobile} name="displayMobile" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayMobile${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>이메일</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayEmail${contents.index}`} type="checkbox" checked={contents.profile.displayEmail} name="displayEmail" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayEmail${contents.index}`}></label>
                </dd>
            </dl>
            <dl>
                <dt>주소</dt>
                <dd>
                    <input className="tgl tgl-light" id={`displayAddress${contents.index}`} type="checkbox" checked={contents.profile.displayAddress} name="displayAddress" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor={`displayAddress${contents.index}`}></label>
                </dd>
            </dl>
        </div>
    )
}

const HistoryForm = ({contents,modifyContents,saveHistory}) => {
    const historyData = [
        {
            name : "basicHistory",
            ableList : ["education","career"],
        },
    ];
    const changeLink = async(link) => {
        contents.link = link;
        await modifyContents(contents);
        saveHistory("historyLink");
    }
    return (
        <div className="detailForm historyForm">
            <dl>
                <dt>링크</dt>
                <dd>
                    <Input type="select" defaultValue={contents.link} onChange={ e => changeLink(e.target.value)}>
                        {
                            historyData.find(data => data.name === contents.id).ableList.indexOf("education") > -1 &&
                            <option value="education">학력</option>
                        }
                        {
                            historyData.find(data => data.name === contents.id).ableList.indexOf("career") > -1 &&
                            <option value="career">경력</option>
                        }
                    </Input>
                </dd>
            </dl>
        </div>
    )
}

const SkillForm = ({contents,modifyContents,saveHistory}) => {

    const changeColors = async (name,value) => {
        contents.skill[name] = value;
        await modifyContents(contents);
        let historyName = "";
        if(name === "background"){
            historyName = "skillBackground";
        }else if(name === "text"){
            historyName = "skillText";
        }else if(name === "bar"){
            historyName = "skillBar";
        }
        saveHistory(historyName);
    }

    

    return(
        <div className="detailForm skillForm">
            <dl>
                <dt>스킬명 배경색</dt>
                <dd>
                    <label htmlFor="skillTitleBgColor" style={{backgroundColor:`${contents.skill.background}`}} /> 
                    <input type="color" id="skillTitleBgColor" value={contents.skill.background} onChange={e => changeColors("background",e.target.value)}/>
                </dd>
            </dl>
            <dl>
                <dt>스킬명 글색</dt>
                <dd>
                    <label htmlFor="skillTitleColor" style={{backgroundColor:`${contents.skill.text}`}} /> 
                    <input type="color" id="skillTitleColor" value={contents.skill.text} onChange={e => changeColors("text",e.target.value)}/>
                </dd>
            </dl>
            <dl>
                <dt>스킬바 색상</dt>
                <dd>
                    <label htmlFor="skillBarColor" style={{backgroundColor:`${contents.skill.bar}`}} /> 
                    <input type="color" id="skillBarColor" value={contents.skill.bar} onChange={e => changeColors("bar",e.target.value)}/>
                </dd>
            </dl>
        </div>
    )
};

const WorkForm = ({contents,modifyContents,saveHistory}) => {

    const changeGrid = async (grid) => {
        contents.grid = grid;
        await modifyContents(contents);
        saveHistory("workGrid");
    }

    return(
        <div className="detailForm workForm">
            <dl>
                <dt>그리드</dt>
                <dd style={{display:"flex"}}>
                    <span style={{flex:"0 0 20%",color:"#4789e7"}}>{contents !== null && contents.grid}</span>
                    <input style={{flex:"0 0 80%"}} type="range" min="1" max="6" value={contents !== null && contents.grid} onChange={e => changeGrid(e.target.value)}/>
                </dd>
            </dl>
        </div>
    )
}