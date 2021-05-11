import React from 'react';
import Slider from 'react-slick';
import MainSlideItem from '../../components/main/MainSlideItem';
import image1 from '../../resources/images/main/mainSlide01.jpeg';
import image2 from '../../resources/images/main/mainSlide02.png';
import image3 from '../../resources/images/main/mainSlide03.jpeg';

const items = [
    {
        src : image1,
    },
    {
        src : image2,
    },
    {
        src : image3,
    },
];

const MainSlide = () => {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className="mainSlide">
            <Slider
                {
                    ...setting
                }
            >
                {
                    items.map(
                        (item,index) => <MainSlideItem key={index} item={item}/>
                    )
                }
            </Slider>
        </div>
    )
}

export default MainSlide;