import { faPlusSquare,faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { createMainConsumer } from '../../../context/mainContext';


const GalleyList = ({workList,selectWork,clickLikeButton,loginMember}) => {
    return (
        <div className="galleryList">
            <ul>
                {
                    workList.length > 0 ?
                        workList.map(
                            work => 
                                <li key={work.workNumber} onClick={() => selectWork(work.workNumber)}>
                                    <div className="thumbnail" style={{backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.thumbnail})`}}>
                                        <div className="titleBox">
                                            <h6 className="title">{work.title}</h6>
                                            <div className="btnBox">
                                                <button>
                                                {loginMember !== null && loginMember.memberNumber !== "" && work.likeList.find( like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>}
                                                </button>
                                                <button onClick={() => clickLikeButton(work.workNumber)}>
                                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="workInfo">
                                        <div className="profileImage" style={ work.profileImage !== null || work.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${work.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                            {
                                                work.profileImage !== null ?
                                                "" : work.email === null ? "P" : work.email.split("")[0].toUpperCase()
                                            }
                                        </div>
                                        <div className="name">{work.name}</div>
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
                                </li>
                        )
                        :
                        <li className="empty">
                            준비된 창작물인 없습니다.
                        </li>
                }
            </ul>
        </div>
    )
}

export default  createMainConsumer(GalleyList);