import React from 'react';
import ArchiveProfile from '../../containers/contents/archive/ArchiveProfile';
import ArchiveTab from '../../containers/contents/archive/ArchiveTab';
import '../../resources/scss/contents/archive.scss';
import axios from 'axios';
import { createCommonConsumer } from '../../context/commonContext';
import { ArchiveProvider } from '../../context/archiveContext';
import ArchiveBackground from '../../containers/contents/archive/ArchiveBackground';

const Archive = ({loginMember,history}) => {
    return (
        <ArchiveProvider loginMember={loginMember} history={history}>
            <div className="archive">
                <ArchiveBackground/>
                <ArchiveProfile/>
                <ArchiveTab/>
            </div>
        </ArchiveProvider>
    )
}

export default createCommonConsumer(Archive);