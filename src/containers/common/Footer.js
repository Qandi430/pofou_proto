import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="footerLeft">
                <div className="companyName">
                    포포유
                </div>
            </div>
            <div className="footerRight">
                <ul className="siteMap">
                    <li><Link to="/">서비스소개</Link></li>
                    <li><Link to="/">공지사항</Link></li>
                    <li><Link to="/">운영정책</Link></li>
                    <li><Link to="/">개인정보처리방침</Link></li>
                    <li><Link to="/">자주묻는질문</Link></li>
                    <li><Link to="/">문의하기</Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
