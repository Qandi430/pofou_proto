import React from 'react';
import ArchiveProfile from '../../containers/contents/archive/ArchiveProfile';
import ArchiveTab from '../../containers/contents/archive/ArchiveTab';
import '../../resources/scss/contents/archive.scss';
import axios from 'axios';
import { createCommonConsumer } from '../../context/commonContext';
import { ArchiveProvider } from '../../context/archiveContext';
import ArchiveBackground from '../../containers/contents/archive/ArchiveBackground';
import PackmanLoader from '../../components/common/PackmanLoader';
import LoginNoticeModal from '../../components/common/LoginNoticeModal';

const Archive = ({loginMember,history,openSpinnerModal,toggleSpinnerModal,toggleLoginNoticeModal}) => {
    return (
        <ArchiveProvider loginMember={loginMember} history={history} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} toggleLoginNoticeModal = {toggleLoginNoticeModal}>
            <div className="archive">
                <ArchiveBackground/>
                <ArchiveProfile/>
                <ArchiveTab/>
            </div>
            <PackmanLoader isOpen={openSpinnerModal} toggle={toggleSpinnerModal}/>
            <LoginNoticeModal/>
        </ArchiveProvider>
    )
}

export default createCommonConsumer(Archive);