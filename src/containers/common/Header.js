import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import GlobalNavigation from '../../components/header/GlobalNavigation';
import PersonalNavigation from '../../components/header/PersonalNavigation';
import { createCommonConsumer } from '../../context/commonContext';

const Header = ({history}) => {
    useEffect(() => {
        console.log(history.location.pathname);
    })
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

export default createCommonConsumer(Header);