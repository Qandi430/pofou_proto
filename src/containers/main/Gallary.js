import React, { useState } from 'react';
import PackmanLoader from '../../components/common/PackmanLoader';
import WorkDetailModal from '../../components/common/WorkDetailModal';
import Filters from '../../components/main/Gallary/Filters';
import GalleyList from '../../components/main/Gallary/GalleryList';
import { createMainConsumer } from '../../context/mainContext';

const Gallery = ({openSpinnerModal,toggleSpinnerModal,openWorkDetailModal,toggleWorkDetailModal,workDetail,loginMember,getLikeList}) => {

    const [openDetailModal,setOpenDetailModal] = useState(false);
    const toggleDetailModal = () => {
        setOpenDetailModal(!openDetailModal);
    }

    return (
        <div className="gallary">
            <Filters/>
            <GalleyList toggleDetailModal={toggleDetailModal}/>
            <PackmanLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember} getLikeList={getLikeList} toggleSpinnerModal={toggleSpinnerModal}/>
        </div>
    )
}

export default createMainConsumer(Gallery);