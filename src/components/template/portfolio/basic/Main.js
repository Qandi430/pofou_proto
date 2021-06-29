import React from 'react';
import MainImage from '../../../../resources/images/template/portfolio/basic/basicMainImage.jpg'

const Main = () => {
    return (
        <div className="main" style={{backgroundImage : `url(${MainImage})`}}>
            <div className="titleWrap">
                <h2 className="title">
                    Welcome to <br />
                    My Portfolio
                </h2>
            </div>
        </div>
    )
}

export default Main;