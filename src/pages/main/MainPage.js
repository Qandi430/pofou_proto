import React from 'react';
import Gallery from '../../containers/main/Gallary';
import { createCommonConsumer } from '../../context/commonContext';
import { MainProvider } from '../../context/mainContext';
import '../../resources/scss/main/main.scss';

const MainPage = ({loginMember,history}) => {
    return (
        <MainProvider loginMember={loginMember} history={history}>
            <div className="main">
                <Gallery/>
            </div>
        </MainProvider>
    )
}

export default createCommonConsumer(MainPage);