import { faCopy, faEdit, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltH, faArrowsAltV, faFillDrip, faPlus, faSort, faTh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const ConfigHeader = ({modifyHistory,revertHistory}) => {
    const [openHistoryBox,setOpenHistoryBox] = useState(false);
    return(
        <header className="configHeader">
            <div className="headerLeft">
                <button>사이트 설정</button>
            </div>
            <div className="headerRight">
                <button onMouseEnter={() => setOpenHistoryBox(true)} onMouseLeave={() => setOpenHistoryBox(false)}>
                    되돌리기
                    <HistoryBox openHistoryBox={openHistoryBox} modifyHistory={modifyHistory} revertHistory={revertHistory}/>        
                </button>
                <button>저장하기</button>
                <button>편집끝내기</button>
            </div>
        </header>
    )
}

const HistoryBox = ({openHistoryBox,modifyHistory,revertHistory}) => {
    return(
        <div className={`historyBox ${openHistoryBox ? "on" : ""}`}>
            <ul>
                {
                    modifyHistory.length < 1 ? 
                    <li className="blank">수정된 기록이 없습니다.</li>:
                    modifyHistory.map(
                        (history,index) => {
                            switch(history.history){
                                case "logStart":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlayCircle}/>
                                            로그 시작
                                        </li>
                                    )
                                case "addBlock":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            블럭이 추가됨
                                        </li>
                                    )
                                case "addContents":
                                    return (
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                            블럭에 컨텐츠 추가됨
                                        </li>
                                    )
                                case "removeBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            블럭이 삭제됨
                                        </li>
                                    )
                                case "copyBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faCopy}/>
                                            블럭이 복제됨
                                        </li>
                                    )
                                case "sortBlock":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            블럭순서 변경됨
                                        </li>
                                    )
                                case "paddingTop":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            블럭 상단 여백 변경됨
                                        </li>
                                    )
                                case "paddingBottom":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltV}/>
                                            블럭 하단 여백 변경됨
                                        </li>
                                    )
                                case "container":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faArrowsAltH}/>
                                            블럭 좌우 여백 변경됨
                                        </li>
                                    )
                                case "backgroundColor":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faFillDrip}/>
                                            배경색 변경됨
                                        </li>
                                    )
                                case "sortContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faSort}/>
                                            블럭 내 컨텐츠 순서 변경됨
                                        </li>
                                    )
                                case "removeContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                            블럭 내 컨텐츠 삭제됨
                                        </li>
                                    )
                                case "grid":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faTh}/>
                                            블럭내 컨텐츠 가로 개수 변경됨
                                        </li>
                                    )
                                case "modifyContents":
                                    return(
                                        <li key={index} onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                            컨텐츠 수정됨
                                        </li>
                                    )
                                default:
                                    return(
                                        <li key={index}  onClick={() => revertHistory(history.index)} className={`${index === modifyHistory.length -1 ? "on" : ""}`}>{history.history}</li>
                                    )
                            }
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default ConfigHeader;