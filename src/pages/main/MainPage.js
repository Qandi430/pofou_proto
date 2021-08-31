import React from 'react';
import Gallery from '../../containers/main/Gallary';
import MainSlide from '../../containers/main/MainSlide';
import { createCommonConsumer } from '../../context/commonContext';
import { MainProvider } from '../../context/mainContents';
import '../../resources/scss/main/main.scss';

const MainPage = ({loginMember,history}) => {
    return (
        <MainProvider loginMember={loginMember} history={history}>
            <div className="main">
                <MainSlide/>
                <Gallery/>
            </div>
        </MainProvider>
    )
}

export default createCommonConsumer(MainPage);