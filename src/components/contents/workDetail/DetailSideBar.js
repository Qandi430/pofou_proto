import React, { useState,Fragment,useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, InputGroup,Input  } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFolderPlus, faPlus, faShareSquare, faHeart as fullHeart, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import blogIcon from '../../../resources/images/common/icon_naver_blog.png';
import kakaoIcon from '../../../resources/images/common/icon_kakao.png';
const DetailSideBar = ({data,loginMember,handleLike,clickCancelCollection,clickCollectionButton,clickFollowButton,clickCancelFollow}) => {
    const [openProfileDetail,setOpenProfileDetail] = useState(false); 
    const [openShareModal,setOpenShareModal] = useState(false);
    const toggleProfileDetail = () => {
        if(openProfileDetail){
            setOpenProfileDetail(false);
        }else{
            setOpenProfileDetail(true);
        }
    }
    const toggleShareModal = () => {
        setOpenShareModal(!openShareModal);
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
                        <button className="btnIcon" onClick={toggleShareModal}><FontAwesomeIcon icon={faShareSquare}/></button>
                        <div className="btnName">공유하기</div>
                    </li>
                </ul>
                <ShareModal isOpen={openShareModal} toggle={toggleShareModal} data={data}/>
            </div>
    )
}


const ShareModal = ({isOpen,toggle,data}) => {
    

    const handleCopy = () => {
        document.getElementById("copyInput").select();
        document.execCommand("copy");
        alert("복사 되었습니다.");
    }

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${data.title}&url=http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`, '_blank','width=600, height=350, menubar=no, status=no, toolbar=no')
    }

    const shareFacebook = () => {
        window.open(`http://www.facebook.com/sharer/sharer.php?u=http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`,'_blank','width=600, height=350, menubar=no, status=no, toolbar=no');
    }

    const sharePinterest = () => {
        const {PinUtils} = window;
        PinUtils.pinOne({
            'url' : `http://www.pofou.com/workDetail/${data.url}/${data.workNumber}`,
            'media' : `https://storage.googleapis.com/pofou_repo/${data.thumbnail}`,
            'description': `${data.title}`
        });
    }

    const shareBlog = () => {
        alert("준비중 입니다.");
    }

    const shareKakao = () => {
        const {Kakao} = window;
        console.log(Kakao);
        Kakao.Link.sendDefault({
            objectType : 'feed',
            content : {
                title : `${data.title}`,
                description : `${data.tag}`,
                imageUrl : `https://storage.googleapis.com/pofou_repo/${data.thumbnail}`,
                link : {
                    mobileWebUrl: `http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`,
                    webUrl: `http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`,
                },
            },
            buttons : [
                {
                    title : "포포유 바로가기",
                    link : {
                        mobileWebUrl: `http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`,
                        webUrl: `http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`,
                    },
                },
            ],
        });
    }

    return (
        <Modal id="shareModal" isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>프로젝트 공유하기</ModalHeader>
            <ModalBody>
                <div className="workInfo">
                    <div className="thumbnailImage">
                        {
                            data.thumbnail !== "" && <img src={`https://storage.googleapis.com/pofou_repo/${data.thumbnail}`} alt="" />
                        }
                    </div>
                    <h5 className="workTitle">{data.title}</h5>
                </div>
                <div className="snsList">
                    <ul>
                        <li>
                            <button style={{backgroundColor:"rgb(74,141,238)"}} onClick={shareTwitter}>
                                <FontAwesomeIcon icon={faTwitter}/>
                            </button>
                            트위터
                        </li>
                        <li>
                            <button style={{backgroundColor:"rgb(61,94,240)"}} onClick={shareFacebook}>
                                <FontAwesomeIcon icon={faFacebookF}/>
                            </button>
                            페이스북
                        </li>
                        <li>
                            <button style={{backgroundColor:"rgb(220,0,55)"}} onClick={sharePinterest} data-description={data.title}>
                                <FontAwesomeIcon icon={faPinterestP}/>
                            </button>
                            핀터레스트
                        </li>
                        <li>
                            <button style={{backgroundColor:"rgb(67,168,57)"}} onClick={shareBlog}>
                                <img src={blogIcon} alt="" />
                            </button>
                            블로그
                        </li>
                        <li>
                            <button style={{backgroundColor:"rgb(242,224,8)"}} onClick={shareKakao}>
                                <img src={kakaoIcon} alt="" />
                            </button>
                            카카오톡
                        </li>
                    </ul>
                </div>
                <div className="shareInput">
                    <InputGroup>
                        <Input id="copyInput" value={`http://34.82.14.122:3000/workDetail/${data.url}/${data.workNumber}`} readOnly/>
                        <Button onClick={handleCopy}>URL 복사</Button>
                    </InputGroup>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default DetailSideBar;
