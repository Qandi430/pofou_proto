import { faBell } from '@fortawesome/free-regular-svg-icons';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Form } from 'reactstrap';
import { createCommonConsumer } from '../../context/commonContext';
import AlarmMenu from './AlarmMenu';
import MyPageMenu from './MyPageMenu';

const PersonalNavigation = ({isLogin,history,loginMember}) => {
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
                <li>
                    <div className="searchBox">
                        <form>
                            <input type="text" name="serachText" id="searchText"/>
                            <button>
                                <FontAwesomeIcon icon={faSearch}/>
                            </button>
                        </form>
                    </div>
                </li>
                {
                    isLogin &&
                        <li>
                            <Link className="btnUpload" to="/upload">업로드</Link>
                        </li>
                }
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
                            <button className="btnMyPage" onClick={handleOpenMyPageMenu} style={ loginMember !== null && loginMember.profileImage !== null ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${loginMember.profileImage})`} : {backgroundColor:"#89c997"}}>
                                {
                                    loginMember !== null && loginMember.profileImage !== null ?
                                    "" : loginMember.member === null ? "P" : loginMember.email.split("")[0].toUpperCase()
                                }
                            </button>
                            : <Link className="btnRegist" to="/auth/register">회원가입</Link>
                    }
                    {
                        (isLogin && openMyPageMenu) &&
                        <MyPageMenu/>
                    }
                </li>            
            </ul>
        </nav>
    )
}

export default createCommonConsumer(PersonalNavigation);