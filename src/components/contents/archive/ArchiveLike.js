import React from 'react';
import { Link } from 'react-router-dom';
import { createArchiveConsumer } from '../../../context/archiveContext';
import {faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faHeart as fullHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArchiveLike = ({show,likedList,selectWork,loginMember}) => {
    return (
        <div className={`archiveLike ${likedList.length < 0 ? "empty" : ""} ${show}`}>
            {
                likedList.length > 0 ?
                <div className="workList">
                    <ul>
                        {
                            likedList.map(
                                work => 
                                    <li key={work.workNumber} onClick={() => selectWork(work.workNumber)} style={{backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}>
                                        <div className="workInfo">
                                            <div className="infoTop">
                                                <div className="profile">
                                                    <div className="profileImage" style={ work.profileImage !== null || work.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                                        {
                                                            work.profileImage !== null ?
                                                            "" : work.email === null ? "P" : work.email.split("")[0].toUpperCase()
                                                        }
                                                    </div>
                                                    <div className="name">{work.name}</div>
                                                </div>
                                                <div className="info">
                                                    <span className="viewCnt">
                                                        <FontAwesomeIcon icon={faEye}/> {work.viewCnt}
                                                    </span>
                                                    <span className="like">
                                                        {loginMember !== null && loginMember.memberNumber !== "" && work.likeList.find( like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>}
                                                        &nbsp;{work.likeList === null ? 0 : work.likeList.length}
                                                    </span>
                                                </div>       
                                            </div>
                                            <div className="infoBottom">
                                            <h6 className="title">{work.title}</h6>
                                                <div className="btnBox">
                                                    {/* <button onClick={(e) => clickLikeButton(e,work.workNumber)}> */}
                                                    <button>
                                                        {loginMember !== null && loginMember.memberNumber !== "" && work.likeList.find( like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>}
                                                    </button>
                                                    {/* <button onClick={() => clickLikeButton(work.workNumber)}> */}
                                                    <button>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                            )
                        }
                    </ul>
                </div>
                :
                <div className="workEmpty">
                    ?????? ???????????? ????????? ????????????.
                    <Link to="/upload">?????? ??????????????????</Link>
                </div>
            }
        </div>
    )
}

export default createArchiveConsumer(ArchiveLike);