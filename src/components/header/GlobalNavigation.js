import React from 'react';
import {Link} from 'react-router-dom';

const GlobalNavigation = () => {
    return (
        <nav className="gnb">
            <ul>
                <li>
                    <Link to="/">갤러리</Link>
                </li>
                <li>
                    <Link to="/">갤러리</Link>
                </li>
                <li>
                    <Link to="/">갤러리</Link>
                </li>
                <li>
                    <Link to="/">갤러리</Link>
                </li>
            </ul>
        </nav>
    )
}

export default GlobalNavigation;