import React, { useState } from 'react';
import PackmanLoader from '../../components/common/PackmanLoader';
import WorkDetailModal from '../../components/common/WorkDetailModal';
import Filters from '../../components/main/Gallary/Filters';
import GalleryDetailModal from '../../components/main/Gallary/GalleryDetailModal';
import GalleyList from '../../components/main/Gallary/GalleryList';
import { createMainConsumer } from '../../context/mainContext';
import detail1 from '../../resources/images/main/detail01.jpeg';
import detail2 from '../../resources/images/main/detail02.jpeg';
import detail3 from '../../resources/images/main/detail03.jpeg';
import profile from '../../resources/images/main/profile.jpeg';

const selectedItem = {
    title : "꿈을꿔봐요",
    registrationDate : '6일전',
    member : {
        name : "5unday",
        profile : profile,
    },
    categoryList : [
        '그래픽 디자인',
        '일러스트레이션'
    ],
    viewCnt : 312,
    like : 17,
    commentList : [

    ],
    contentList : [
        {
            content : `<img src='${detail1}'/>`,
        },
        {
            content : `<img src='${detail2}'/>`,
        },
        {
            content : `<img src='${detail3}'/>`,
        },
    ],
    hashtagList : [
        "어린이",
        "리플렛",
        "디자인",
        "일러스트",
        "그래픽",
        "꿈",
        "도형",
    ],
};

const Gallery = ({openSpinnerModal,toggleSpinnerModal,openWorkDetailModal,toggleWorkDetailModal,workDetail,loginMember,clickLikeButton}) => {

    const [openDetailModal,setOpenDetailModal] = useState(false);
    const toggleDetailModal = () => {
        setOpenDetailModal(!openDetailModal);
    }

    return (
        <div className="gallary">
            <Filters/>
            <GalleyList toggleDetailModal={toggleDetailModal}/>
            <GalleryDetailModal toggle={toggleDetailModal} isOpen={openDetailModal} item={selectedItem}/>
            <PackmanLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember} clickLikeButton={clickLikeButton} toggleSpinnerModal={toggleSpinnerModal}/>
        </div>
    )
}

export default createMainConsumer(Gallery);