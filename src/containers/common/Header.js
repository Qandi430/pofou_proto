import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import GlobalNavigation from '../../components/header/GlobalNavigation';
import PersonalNavigation from '../../components/header/PersonalNavigation';

const Header = () => {
    return (
        <header>
            <Container className="headerWrap">
                <h1 className="logo">
                    <Link to="/">POFOU</Link>
                </h1>
                <GlobalNavigation/>
                <PersonalNavigation/>
            </Container>
        </header>
    )
}

export default Header;