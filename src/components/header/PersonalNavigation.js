import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const PersonalNavigation = () => {
    return (
        <nav className="pnb">
            <ul>
                <li>
                    <Link className="btnUpload" to="/upload">업로드</Link>
                </li>
                <li>
                    <button>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </li>
                <li>
                    <Link className="btnLogin" to="/auth/login">로그인</Link>
                </li>
                <li>
                    <Link className="btnRegist" to="/auth/register">회원가입</Link>
                </li>            
            </ul>
        </nav>
    )
}

export default PersonalNavigation;