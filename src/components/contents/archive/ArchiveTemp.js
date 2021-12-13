import React,{Fragment} from 'react';
import { createArchiveConsumer } from '../../../context/archiveContext';
import {faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faHeart as fullHeart, faPlus,faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ArchiveTemp = ({show,tempWorkList,selectWork,loginMember,editMode,openPersonalMenu,togglePersonalMenu,toggleWorkNoticeModal}) => {
    return (
        <div className={`archiveTemp ${tempWorkList.length < 0 ? "empty" : ""} ${show}`}>
        {
            tempWorkList.length > 0 ?
            <div className="workList">
                <ul>
                    {
                        tempWorkList.map(
                            work => 
                                <li key={work.workNumber} onClick={() => selectWork(work.workNumber)} style={{backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}>
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
                                                                <li><button onClick={e=> toggleWorkNoticeModal(e,"public",work.workNumber)}>공개로 설정하기</button></li>
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
                                            {/* <div className="btnBox">
                                                <button onClick={(e) => clickLikeButton(e,work.workNumber)}>
                                                    {loginMember !== null && loginMember.memberNumber !== "" && work.likeList.find( like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>}
                                                </button>
                                                <button>
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </li>
                        )
                    }
                </ul>
            </div>
            :
            <div className="workEmpty">
                임시저장소에 작품이 없습니다.
            </div>
        }
    </div>
    )
}

export default createArchiveConsumer(ArchiveTemp);