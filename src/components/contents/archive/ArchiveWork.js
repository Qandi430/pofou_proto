import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { createArchiveConsumer } from '../../../context/archiveContext';
import {faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faEllipsisH, faHeart as fullHeart, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ArchiveWork = ({show,workList,selectWork,loginMember,editMode,openPersonalMenu,togglePersonalMenu,clickLikeButton,changeWorkStatus,toggleWorkNoticeModal}) => {
    return (
        <div className={`archiveWork ${workList.length < 0 ? "empty" : ""} ${show}`}>
            {
                workList.length > 0 ?
                <div className="workList">
                    <ul>
                        {
                            workList.map(
                                work => 
                                    <li key={work.workNumber} onClick={() => selectWork(work.workNumber)} onMouseLeave={(e) => togglePersonalMenu(e,-1)} style={{backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}>
                                        <div className="workInfo">
                                            <div className="infoTop">
                                                <div className="profile">
                                                    {
                                                        editMode ?
                                                        <div className="personal">
                                                            <button onClick={(e) => togglePersonalMenu(e,work.workNumber)}>
                                                                <FontAwesomeIcon icon={faEllipsisH}/>
                                                            </button>
                                                            <div className={`menu ${openPersonalMenu === work.workNumber ? "on" : ""}`}>
                                                                <ul>
                                                                    <li><Link to={`/upload/${work.workNumber}`}>수정하기</Link></li>
                                                                    <li><button onClick={e=> toggleWorkNoticeModal(e,"private",work.workNumber)}>비공개로 설정하기</button></li>
                                                                    <li><button onClick={e=> toggleWorkNoticeModal(e,"delete",work.workNumber)}>삭제하기</button></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        :
                                                        <Fragment>
                                                            <div className="profileImage" style={ work.profileImage !== null || work.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                                                {
                                                                    work.profileImage !== null ?
                                                                    "" : work.email === null ? "P" : work.email.split("")[0].toUpperCase()
                                                                }
                                                            </div>
                                                            <div className="name">{work.name}</div>
                                                        </Fragment>
                                                    }
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
                                                    <button onClick={(e) => clickLikeButton(e,work.workNumber)}>
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
        </div>
    )
}

export default createArchiveConsumer(ArchiveWork);