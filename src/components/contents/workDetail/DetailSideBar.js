import React, { useState,Fragment } from 'react'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFolderPlus, faPlus, faShareSquare, faHeart as fullHeart, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
const DetailSideBar = ({data,loginMember,handleLike,clickCancelCollection,clickCollectionButton,clickFollowButton,clickCancelFollow}) => {
    const [openProfileDetail,setOpenProfileDetail] = useState(false); 
    const toggleProfileDetail = () => {
        if(openProfileDetail){
            setOpenProfileDetail(false);
        }else{
            setOpenProfileDetail(true);
        }
    }
    return (
        <div className="detailSidebar">
                <ul>
                    <li className="btnProfile">
                        <button className="btnIcon" onClick={toggleProfileDetail} style={ data.profileImage !== null && data.profileImage !== "" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${data.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                            {
                                data.profileImage === "" && data.profileImage !== "" ? "" :  
                                    data.email !== "" && data.email !== null && data.email !== undefined ? data.email.split("")[0].toUpperCase() : "P"
                            }
                        </button>
                        <div className="btnName">프로필</div>
                        <div className={`profileDetail ${openProfileDetail ? "on" : ""}`}>
                            <div className="detailWrap">
                                <div className="infoBox">
                                    <div className="profileImage" style={ data.profileImage !== null ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${data.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                        {
                                            data.profileImage === "" && data.profileImage !== "" ? "" :  
                                                data.email !== "" && data.email !== null && data.email !== undefined ? data.email.split("")[0].toUpperCase() : "P"
                                        }
                                    </div>
                                    <h4 className="name">{data.name}</h4>
                                    <div className="category">
                                        <ul>
                                            {
                                                data.keyword1 !== "" && <li>{data.keyword1}</li>
                                            }
                                            {
                                                data.keyword2 !== "" && <li>{data.keyword2}</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="btnBox">
                                    <Button className="btnArchive" tag={Link} to={`/archive/${data.url}`}>아카이브</Button>
                                    <Button className="btnFollow"><FontAwesomeIcon icon={faPlus}/> 팔로우</Button>
                                </div>
                                <button className="btnClose" onClick={toggleProfileDetail}><FontAwesomeIcon icon={faTimes}/></button>
                            </div>
                        </div>
                    </li>
                    {
                        loginMember !== null && loginMember.memberNumber !== "" && loginMember.memberNumber !== data.memberNumber &&
                            (() => {
                                if(loginMember.followings.find(following => following.followMemberNumber === data.memberNumber)){
                                    return (
                                        <li className="btnFollowCancel">
                                            <button className="btnIcon" style={{color: "#f85272"}} onClick={() => clickCancelFollow()}><FontAwesomeIcon icon={faCheck}/></button>
                                            <div className="btnName">팔로잉</div>
                                        </li>
                                    )
                                }else{
                                    return (
                                        <li className="btnFollow">
                                            <button className="btnIcon" onClick={() => clickFollowButton()}><FontAwesomeIcon icon={faPlus}/></button>
                                            <div className="btnName">팔로우</div>
                                        </li>
                                    )
                                }
                            })()
                    }
                    {/* <li className="btnRequest">
                        <button className="btnIcon"><FontAwesomeIcon icon={faEdit}/></button>
                        <div className="btnName">의뢰하기</div>
                    </li> */}
                    <li className="btnLike">
                        <button className="btnIcon" onClick={handleLike}>
                            {
                                loginMember !== null && loginMember.memberNumber !== "" && data.likeList !== null && data.likeList !== undefined && data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>
                            }
                        </button>
                        <div className="btnName">좋아요</div>
                    </li>
                    <li className="btnCollection">
                        {/* <button className="btnIcon" onClick={() => clickCollectionButton()}><FontAwesomeIcon icon={faFolderPlus}/></button>
                        <div className="btnName">컬렉션</div> */}
                        {
                            loginMember !== null && loginMember.memberNumber !== "" &&  loginMember.collectionList.indexOf(data.workNumber) > -1?
                            <Fragment>
                                <button className="btnIcon" style={{color: "#89c997"}} onClick={() => clickCancelCollection()}><FontAwesomeIcon icon={faFolderPlus}/></button>
                                <div className="btnName">컬렉션</div>
                            </Fragment>
                            :
                            <Fragment>
                                <button className="btnIcon" onClick={() => clickCollectionButton()}><FontAwesomeIcon icon={faFolderPlus}/></button>
                                <div className="btnName">컬렉션</div>
                            </Fragment>
                        }
                    </li>
                    <li className="btnShare">
                        <button className="btnIcon"><FontAwesomeIcon icon={faShareSquare}/></button>
                        <div className="btnName">공유하기</div>
                    </li>
                </ul>
            </div>
    )
}

export default DetailSideBar;
