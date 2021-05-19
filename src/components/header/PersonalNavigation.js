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
                    <button>로그인</button>
                </li>
                <li>
                    <button>회원가입</button>
                </li>            
            </ul>
        </nav>
    )
}

export default PersonalNavigation;