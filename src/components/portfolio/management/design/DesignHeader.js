import { faEdit, faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';

const DesignHeader = ({data,setPageDisplay,toggleAllConfigModal}) => {

    const [openMenu,setOpenMenu] = useState("");

    const toggleMenu = name => {
        if(name === openMenu){
            setOpenMenu("")
        }else{
            setOpenMenu(name)
        }
    }

    return (
        <header className="designHeader">
            <div className="headerLeft">
                <button className={`btnConfigMenu ${openMenu === "menu" ? "on" : ""}`} onClick={() => toggleMenu('menu')}>설정</button>
            </div>
            <div className="headerRight">
                <button>저장 하기</button>
                <Link to="/portfolio/management">편집 끝내기</Link>
            </div>
            <div className={`configMenu ${openMenu === "menu" ? "on" : ""}`}>
                <ul className="menuList">
                    <li>
                        <div className="pageName">메인</div>
                        <div className="btnWrap">
                            <button>
                                <FontAwesomeIcon icon={faEdit}/>
                                <div className="customTooltip">
                                    수정
                                </div>
                            </button>
                            <button onClick={() => setPageDisplay("main")}>
                                {
                                    data.main.setting.display ?
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    : <FontAwesomeIcon icon={faEye}/>
                                }
                                
                                <div className="customTooltip">
                                    숨김
                                </div>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="pageName">About</div>
                        <div className="btnWrap">
                            <button>
                                <FontAwesomeIcon icon={faEdit}/>
                                <div className="customTooltip">
                                    수정
                                </div>
                            </button>
                            <button onClick={() => setPageDisplay("about")}>
                                {
                                    data.about.setting.display ?
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    : <FontAwesomeIcon icon={faEye}/>
                                }
                                <div className="customTooltip">
                                    숨김
                                </div>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                <div className="customTooltip">
                                    삭제
                                </div>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="pageName">Work</div>
                        <div className="btnWrap">
                            <button>
                                <FontAwesomeIcon icon={faEdit}/>
                                <div className="customTooltip">
                                    수정
                                </div>
                            </button>
                            <button onClick={() => setPageDisplay("work")}>
                                {
                                    data.work.setting.display ?
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    : <FontAwesomeIcon icon={faEye}/>
                                }
                                <div className="customTooltip">
                                    숨김
                                </div>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                <div className="customTooltip">
                                    삭제
                                </div>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className="pageName">Contact</div>
                        <div className="btnWrap">
                            <button>
                                <FontAwesomeIcon icon={faEdit}/>
                                <div className="customTooltip">
                                    수정
                                </div>
                            </button>
                            <button onClick={() => setPageDisplay("contact")}>
                                {
                                    data.contact.setting.display ?
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                    : <FontAwesomeIcon icon={faEye}/>
                                }
                                <div className="customTooltip">
                                    숨김
                                </div>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                                <div className="customTooltip">
                                    삭제
                                </div>
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="btnWrap">
                    <button className="btnAddMenu">메뉴 추가</button>
                    <button className="btnAllConfig" onClick={toggleAllConfigModal}>전체 설정</button>
                </div>
            </div>
        </header>
    )
}

export default DesignHeader;