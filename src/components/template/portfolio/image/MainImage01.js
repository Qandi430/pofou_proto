import React from 'react';


const MainImage01 = ({title,media}) => {
    return (
        <div className="mainImage01" style={{backgroundImage : `url(${media})`}}>
            <div className="titleWrap">
                <h2 className={`title`}>
                    <span dangerouslySetInnerHTML={{__html: title }}></span>
                </h2>
            </div>
        </div>
    )
}

export default MainImage01;