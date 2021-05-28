import { faBell } from '@fortawesome/free-regular-svg-icons';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createCommonConsumer } from '../../context/commonContext';
import AlarmMenu from './AlarmMenu';
import MyPageMenu from './MyPageMenu';

const PersonalNavigation = ({isLogin,history}) => {
    const [openMyPageMenu,setOpenMyPageMenu] = useState(false);
    const [openAlarmMenu,setOpenAlarmMenu] = useState(false);
    let location = useLocation();
    
    useEffect(() => {
        setOpenMyPageMenu(false);
        setOpenAlarmMenu(false);
    },[location])

    const handleOpenMyPageMenu = () => {
        if(openAlarmMenu){
            setOpenAlarmMenu(!openAlarmMenu)
        }
        setOpenMyPageMenu(!openMyPageMenu);
    }

    const handleOpenAlarmMenu = () => {
        if(openMyPageMenu){
            setOpenMyPageMenu(!openMyPageMenu)
        }
        setOpenAlarmMenu(!openAlarmMenu);
    }

    return (
        <nav className="pnb">
            <ul>
                {
                    isLogin &&
                        <li>
                            <Link className="btnUpload" to="/upload">업로드</Link>
                        </li>
                }
                <li>
                    <button className="btnSearch">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </li>
                <li>
                    {
                        isLogin ? 
                            <button className="btnAlarm" onClick={handleOpenAlarmMenu}><FontAwesomeIcon icon={faBell}/></button>
                            : <Link className="btnLogin" to="/auth/login">로그인</Link>
                    }
                    {
                        openAlarmMenu &&
                        <AlarmMenu/>
                    }
                </li>
                <li>
                    {
                        isLogin ? 
                            <button className="btnMyPage" onClick={handleOpenMyPageMenu}>
                                D
                            </button>
                            : <Link className="btnRegist" to="/auth/register">회원가입</Link>
                    }
                    {
                        openMyPageMenu &&
                        <MyPageMenu/>
                    }
                </li>            
            </ul>
        </nav>
    )
}

export default createCommonConsumer(PersonalNavigation);