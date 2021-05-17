import React from 'react';
import Gallery from '../../containers/main/Gallary';
import MainSlide from '../../containers/main/MainSlide';
import '../../resources/scss/main/main.scss';

const MainPage = () => {
    return (
        <div className="main">
            <MainSlide/>
            <Gallery/>
        </div>
    )
}

export default MainPage;