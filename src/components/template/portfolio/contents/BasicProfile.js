import React from 'react';

const BasicProfile = ({privacy,grid}) => {
    return (
        <div  className={`contents basicProfile grid${grid}`}>
            <div className="profileImage" style={{position:"relative"}}>
                <img src={privacy.info.profileImage} alt="" className="img-fluid"/>
            </div>
            <div className="privacyList">
                {
                    privacy.info.name !== "" && privacy.displayName &&
                    <dl className="name">
                        <dt>이름</dt>
                        <dd>{privacy.info.name}</dd>
                    </dl>
                }
                {
                    (privacy.info.birthYear !== "" && privacy.info.birthMonth !== "" && privacy.info.birthDay !== "") && privacy.displayBirthDate &&
                    <dl className="name">
                        <dt>생년월일</dt>
                        <dd>{`${privacy.info.birthYear}.${privacy.info.birthMonth}.${privacy.info.birthDay}`} (만 31세)</dd>
                    </dl>
                }
                {
                    privacy.info.gender !== "" && privacy.displayGender &&
                    <dl className="name">
                        <dt>성별</dt>
                        <dd>{privacy.info.gender === "M" ? "남" : "여"}</dd>
                    </dl>
                }
                {
                    privacy.info.gender !== "" && privacy.displayGender &&
                    <dl className="name">
                        <dt>성별</dt>
                        <dd>{privacy.info.gender === "M" ? "남" : "여"}</dd>
                    </dl>
                }
                {
                    privacy.info.phone !== "" && privacy.displayPhone &&
                    <dl className="name">
                        <dt>전화번호</dt>
                        <dd>{privacy.info.phone}</dd>
                    </dl>
                }
                {
                    privacy.info.mobile !== "" && privacy.displayMobile &&
                    <dl className="name">
                        <dt>휴대전화번호</dt>
                        <dd>{privacy.info.mobile}</dd>
                    </dl>
                }
                {
                    privacy.info.email !== "" && privacy.displayEmail &&
                    <dl className="name">
                        <dt>이메일</dt>
                        <dd>{privacy.info.email}</dd>
                    </dl>
                }
                {
                    privacy.info.address !== "" && privacy.displayAddress &&
                    <dl className="name">
                        <dt>주소</dt>
                        <dd>{privacy.info.address}</dd>
                    </dl>
                }
            </div>
        </div>
    )
}

export default BasicProfile;