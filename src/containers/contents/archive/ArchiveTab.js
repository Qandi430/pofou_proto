import React from 'react';
import ArchiveAbout from '../../../components/contents/archive/ArchiveAbout';
import ArchiveCollect from '../../../components/contents/archive/ArchiveCollect';
import ArchiveLike from '../../../components/contents/archive/ArchiveLike';
import ArchiveTemp from '../../../components/contents/archive/ArchiveTemp';
import ArchiveWork from '../../../components/contents/archive/ArchiveWork';
import { createArchiveConsumer } from '../../../context/archiveContext';
import WorkDetailModal from '../../../components/common/WorkDetailModal';
import WorkNoticeModal from '../../../components/contents/archive/WorkNoticeModal';

const ArchiveTab = ({currentTab,toggleCurrentTab,openWorkDetailModal,toggleWorkDetailModal,workDetail,loginMember,editMode}) => {

    return (
        <div className="archiveTab">
            <div className="tabList">
                <ul>
                    <li onClick={() => toggleCurrentTab("about")} className={currentTab === "about" ? "on" :""}><span>정보</span></li>
                    <li onClick={() => toggleCurrentTab("work")} className={currentTab === "work" ? "on" :""}><span>피드</span></li>
                    <li onClick={() => toggleCurrentTab("like")} className={currentTab === "like" ? "on" :""}><span>좋아요</span></li>
                    <li onClick={() => toggleCurrentTab("collect")} className={currentTab === "collect" ? "on" :""}><span>컬렉션</span></li>
                    {
                        editMode && <li onClick={() => toggleCurrentTab("temp")} className={currentTab === "temp" ? "on" :""}><span>임시저장</span></li>
                    }
                </ul>
            </div>
            <div className="tabContents">
                <ArchiveAbout show={currentTab === "about" ? "on" : "off"}/>
                <ArchiveWork show={currentTab === "work" ? "on" : "off"}/>
                <ArchiveLike show={currentTab === "like" ? "on" : "off"}/>
                <ArchiveCollect show={currentTab === "collect" ? "on" : "off"}/>
                <ArchiveTemp show={currentTab === "temp" ? "on" : "off"}/>
            </div>
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember}/>
            <WorkNoticeModal/>
        </div>
    )
}

export default createArchiveConsumer(ArchiveTab);