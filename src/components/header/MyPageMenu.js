import React from 'react';
import { Link } from 'react-router-dom';
import { createCommonConsumer } from '../../context/commonContext';

const MyPageMenu = ({logoutAction,loginMember}) => {
    return (
        <div className="myPageMenu">
            <div className="profile">
                <div className="profileImage noImage" style={ loginMember !== null && loginMember.profileImage !== null ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${loginMember.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                    {
                        loginMember !== null && loginMember.profileImage !== null ?
                        "" : loginMember.member === null ? "P" : loginMember.email.split("")[0].toUpperCase()
                    }
                </div>
                <div className="profileInfo">
                    <h6 className="name">{loginMember !== null && loginMember.name !== "" ? loginMember.name : ""}</h6>
                    <p className="grade">{loginMember !== null && loginMember.memberType !== "" ? loginMember.memberType === "client" ? "클라이언트 회원" : "창작자 회원" : ""}</p>
                </div>
            </div>
            <div className="contentsMenu">
                <ul>
                    <li><Link to="/upload">업로드</Link></li>
                    <li><Link to={`/archive/${loginMember.url}`}>창작물 저장소</Link></li>
                    <li><Link to="/resume/list">이력서/자기소개서</Link></li>
                    <li><Link to="/portfolio/management">나의 포트폴리오</Link></li>
                </ul>
            </div>
            <div className="personalMenu">
                <ul>
                    {/* <li><Link to="/">진행중인 의뢰</Link></li>
                    <li><Link to="/">창작자 리스트</Link></li>
                    <li><Link to="/">결제 내역</Link></li> */}
                    <li><Link to="/myPage/profile">개인정보 설정</Link></li>
                </ul>
            </div>
            <div className="logoutMenu">
                <button className="btnLogout" onClick={logoutAction}>로그아웃</button>
            </div>
        </div>
    )
}

export default createCommonConsumer(MyPageMenu);