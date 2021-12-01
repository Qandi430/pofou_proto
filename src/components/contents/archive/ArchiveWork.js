import React from 'react';
import { Fragment } from 'react-is';
import { Link } from 'react-router-dom';
import { createArchiveConsumer } from '../../../context/archiveContext';
import WorkDetailModal from '../../common/WorkDetailModal';
import {faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faHeart as fullHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArchiveWork = ({show,archive,selectWork,openWorkDetailModal,toggleWorkDetailModal,workDetail,loginMember}) => {
    return (
        <div className={`archiveWork ${archive.workList.length < 0 ? "empty" : ""} ${show}`}>
            {
                archive.workList.length > 0 ?
                <div className="workList">
                    <ul>
                        {
                            archive.workList.map(
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
                    아직 업로드한 작품이 없습니다.
                    <Link to="/upload">지금 등록해보세요</Link>
                </div>
            }
            <WorkDetailModal isOpen={openWorkDetailModal} toggle={toggleWorkDetailModal} workDetail={workDetail} loginMember={loginMember}/>
        </div>
    )
}

export default createArchiveConsumer(ArchiveWork);