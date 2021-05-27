import React from 'react';
import { Link } from 'react-router-dom';

const MyPageMenu = () => {
    return (
        <div className="myPageMenu">
            <div className="profile">
                <div className="profileImage noImage">
                    D
                </div>
                <div className="profileInfo">
                    <h6 className="name">이승재</h6>
                    <p className="grade">클라이언트 회원</p>
                </div>
            </div>
            <div className="contentsMenu">
                <ul>
                    <li><Link to="/">업로드</Link></li>
                    <li><Link to="/">나의 작품</Link></li>
                    <li><Link to="/">나의 이력서</Link></li>
                    <li><Link to="/">나의 포트폴리오</Link></li>
                </ul>
            </div>
            <div className="personalMenu">
                <ul>
                    <li><Link to="/">진행중인 의뢰</Link></li>
                    <li><Link to="/">창작자 리스트</Link></li>
                    <li><Link to="/">결제 내역</Link></li>
                    <li><Link to="/">개인정보 설정</Link></li>
                </ul>
            </div>
            <div className="logoutMenu">
                <button className="btnLogout">로그아웃</button>
            </div>
        </div>
    )
}

export default MyPageMenu;