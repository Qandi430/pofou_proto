import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PersonalNavigation = () => {
    return (
        <nav className="pnb">
            <ul>
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
                <li>
                    
                </li>
            </ul>
        </nav>
    )
}

export default PersonalNavigation;