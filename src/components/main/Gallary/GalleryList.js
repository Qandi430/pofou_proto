import { faPlusSquare,faHeart as emptyHeart,faEye } from '@fortawesome/free-regular-svg-icons';
import {faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'reactstrap';
import { createMainConsumer } from '../../../context/mainContents';
import thumb1 from '../../../resources/images/main/thumb01.gif';
import thumb2 from '../../../resources/images/main/thumb02.jpeg';
import thumb3 from '../../../resources/images/main/thumb03.jpeg';
import thumb4 from '../../../resources/images/main/thumb04.jpeg';
import thumb5 from '../../../resources/images/main/thumb05.jpeg';

const items = [
    {
        itemNo : 1,
        thumbnail : thumb1,
        title : 'test',
        viewCnt : 100,
        like : 30,
        member : {
            memberNumber : 1,
            name : '이승재',
            email : 'dltmdwo430@gmail.com',
        },
    },
    {
        itemNo : 2,
        thumbnail : thumb2,
        title : 'test2',
        viewCnt : 100,
        like : 30,
        member : {
            memberNumber : 1,
            name : '이승재',
            email : 'dltmdwo430@gmail.com',
        },
    },
    {
        itemNo : 3,
        thumbnail : thumb3,
        title : 'test3',
        viewCnt : 100,
        like : 30,
        member : {
            memberNumber : 1,
            name : '이승재',
            email : 'dltmdwo430@gmail.com',
        },
    },
    {
        itemNo : 4,
        thumbnail : thumb4,
        title : 'test4',
        viewCnt : 100,
        like : 30,
        member : {
            memberNumber : 1,
            name : '이승재',
            email : 'dltmdwo430@gmail.com',
        },
    },
    {
        itemNo : 5,
        thumbnail : thumb5,
        title : 'test5',
        viewCnt : 100,
        like : 30,
        member : {
            memberNumber : 1,
            name : '이승재',
            email : 'dltmdwo430@gmail.com',
        },
    },
];

const GalleyList = ({toggleDetailModal,workList,selectWork,clickLikeButton,loginMember}) => {
    return (
        <div className="galleryList">
            {/* <Container>
                <ul>
                    {
                        items.map(
                            item => 
                                <li key={item.itemNo} onClick={toggleDetailModal}>
                                    <div className="thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                                    <div className="titleBox">{item.title}</div>
                                    <div className="infoBox">
                                        <div className="memberInfo">
                                            <div className="memberImage">
                                                {item.member.name}
                                            </div>
                                        </div>
                                        <div className="itemInfo">
                                            <ul>
                                                <li>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                    {item.viewCnt}
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faHeart}/>
                                                    {item.like}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>            
                        )
                    }
                </ul>
            </Container> */}
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