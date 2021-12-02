import React, { useState } from 'react';
import { Container } from 'reactstrap';
import ArchiveAbout from '../../../components/contents/archive/ArchiveAbout';
import ArchiveCollect from '../../../components/contents/archive/ArchiveCollect';
import ArchiveLike from '../../../components/contents/archive/ArchiveLike';
import ArchiveTemp from '../../../components/contents/archive/ArchiveTemp';
import ArchiveWork from '../../../components/contents/archive/ArchiveWork';
import PackmanLoader from '../../../components/common/PackmanLoader';
import { createArchiveConsumer } from '../../../context/archiveContext';

const ArchiveTab = () => {

    const [currentTab,setCurrentTab] = useState("work");

    return (
        <div className="archiveTab">
            <div className="tabList">
                <ul>
                    <li onClick={() => setCurrentTab("about")} className={currentTab === "about" ? "on" :""}><span>정보</span></li>
                    <li onClick={() => setCurrentTab("work")} className={currentTab === "work" ? "on" :""}><span>피드</span></li>
                    <li onClick={() => setCurrentTab("like")} className={currentTab === "like" ? "on" :""}><span>좋아요</span></li>
                    <li onClick={() => setCurrentTab("collect")} className={currentTab === "collect" ? "on" :""}><span>컬렉션</span></li>
                    <li onClick={() => setCurrentTab("temp")} className={currentTab === "temp" ? "on" :""}><span>임시저장</span></li>
                </ul>
            </div>
            <div className="tabContents">
                <ArchiveAbout show={currentTab === "about" ? "on" : "off"}/>
                <ArchiveWork show={currentTab === "work" ? "on" : "off"}/>
                <ArchiveLike show={currentTab === "like" ? "on" : "off"}/>
                <ArchiveCollect show={currentTab === "collect" ? "on" : "off"}/>
                <ArchiveTemp show={currentTab === "temp" ? "on" : "off"}/>
            </div>
        </div>
    )
}

export default createArchiveConsumer(ArchiveTab);