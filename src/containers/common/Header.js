import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNavigation from '../../components/header/GlobalNavigation';
import PersonalNavigation from '../../components/header/PersonalNavigation';
import { createCommonConsumer } from '../../context/commonContext';

const Header = ({history,location,match}) => {
    return (
        <header style={{display : `${location.pathname.indexOf("/portfolio/design") > -1 || location.pathname.indexOf("/portfolio/config") > -1  ? "none" : "flex"}`}}>
            <div className="headerWrap">
                <h1 className="logo">
                    <Link to="/">
                        <img src={`https://storage.googleapis.com/pofou_repo/resources/logo.png`} alt="" />
                    </Link>
                </h1>
                <GlobalNavigation location={location}/>
                <PersonalNavigation/>
            </div>
        </header>
    )
}

export default createCommonConsumer(Header);