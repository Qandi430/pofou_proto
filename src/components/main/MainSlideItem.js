import React from 'react';

const MainSlideItem = ({item}) => {
    return (
        <div className="slideItem">
            <img src={item.src} alt="" className="img-fluid"/>
        </div>
    )
}

export default MainSlideItem;