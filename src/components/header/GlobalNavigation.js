import React from 'react';
import {Link} from 'react-router-dom';

const GlobalNavigation = ({location}) => {
    return (
        <nav className="gnb">
            <ul>
                <li className={`${location.pathname === "/" ? "on" : ""}`}>
                    <Link to="/">둘러보기</Link>
                </li>
                <li>
                    <Link to="/">채용</Link>
                </li>
                <li>
                    <Link to="/">의뢰</Link>
                </li>
            </ul>
        </nav>
    )
}

export default GlobalNavigation;