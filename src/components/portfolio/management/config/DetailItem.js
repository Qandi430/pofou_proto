import React, { Fragment } from 'react';

const DetailItem = ({openDetailItemList,toggleOpenDetailItem,contents,modifyContents}) => {
    return(
        <div className={`detailItem`}>
            <h5 onClick={() => toggleOpenDetailItem(contents.index)}>{`${contents.index+1}. ${contents.name}`}</h5>
            <div className={`panel ${openDetailItemList.indexOf(contents.index) > -1 ? "on":""}`}>
                <div className="panelWrap">
                    {
                        contents.type === "profile" &&
                            <ProfileForm contents={contents} modifyContents={modifyContents}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailItem;

const ProfileForm = ({contents,modifyContents}) => {
    
    const togglePrivacyInfo = e => {
        console.log(e.target.name,e.target.checked)
        contents.privacy[e.target.name] = e.target.checked;
        modifyContents(contents);
    }

    return(
        <Fragment>
            <dl>
                <dt>이름</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayName" type="checkbox" checked={contents.privacy.displayName} name="displayName" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayName"></label>
                </dd>
            </dl>
            <dl>
                <dt>생년월일</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayBirthDate" type="checkbox" checked={contents.privacy.displayBirthDate} name="displayBirthDate" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayBirthDate"></label>
                </dd>
            </dl>
            <dl>
                <dt>성별</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayGender" type="checkbox" checked={contents.privacy.displayGender} name="displayGender" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayGender"></label>
                </dd>
            </dl>
            <dl>
                <dt>전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayPhone" type="checkbox" checked={contents.privacy.displayPhone} name="displayPhone" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayPhone"></label>
                </dd>
            </dl>
            <dl>
                <dt>휴대전화번호</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayMobile" type="checkbox" checked={contents.privacy.displayMobile} name="displayMobile" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayMobile"></label>
                </dd>
            </dl>
            <dl>
                <dt>이메일</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayEmail" type="checkbox" checked={contents.privacy.displayEmail} name="displayEmail" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayEmail"></label>
                </dd>
            </dl>
            <dl>
                <dt>주소</dt>
                <dd>
                    <input className="tgl tgl-light" id="displayAddress" type="checkbox" checked={contents.privacy.displayAddress} name="displayAddress" onChange={ e => togglePrivacyInfo(e)}/>
                    <label className="tgl-btn small" htmlFor="displayAddress"></label>
                </dd>
            </dl>
        </Fragment>
    )
}

const historyForm = () => {

}

const skillForm = () => {

}