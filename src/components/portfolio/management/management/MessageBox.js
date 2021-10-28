import React, { useState } from 'react'
import { createPortfolioConsumer } from '../../../../context/portfolioContext'

const MessageBox = () => {

    const [currentTab,setCurrentTab] = useState("all");
    const [currentList,setCurrentList] = useState([]);

    const handleCurrentTab = (tabName) => {
        setCurrentTab(tabName);
    }

    return (
        <div className="messageBox dashboardBox">
            <ul className="tabList">
                <li className={`${currentTab === "all" ? "on" : ""}`} onClick={() => handleCurrentTab("all")}>전체 메세지 0</li>
                <li className={`${currentTab === "notCheck" ? "on" : ""}`} onClick={() => handleCurrentTab("notCheck")}>읽지않은 메세지 0</li>
                <li className={`${currentTab === "receive" ? "on" : ""}`} onClick={() => handleCurrentTab("receive")}>보낸 메세지 0</li>
            </ul>
            <div className="tabContents">
                {
                    currentList.length > 0 ?
                        <div>asdf</div>
                        :
                        <div className="empty">등록된 메세지가 없습니다.</div>
                }
            </div>
        </div>
    )
}

export default createPortfolioConsumer(MessageBox); 
