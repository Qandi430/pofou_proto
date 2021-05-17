import { faComment, faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faFolderPlus, faPlus, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Input, Modal, ModalBody} from 'reactstrap';

const GalleryDetailModal = ({isOpen,toggle,item}) => {

    const openSidebar = () => {
        document.querySelector('.modal-sidebar').classList.add('on')
    }

    const closeSidebar = () => {
        document.querySelector('.modal-sidebar').classList.remove('on')
    }

    return(
        <Fragment>
            <Modal isOpen={isOpen} toggle={toggle} centered size="xl" id="galleryDetailModal" onOpened={openSidebar} onClosed={closeSidebar}>
                <ModalBody>
                    <div className="detailHeader">
                        <div className="headerLeft">
                            <h3 className="galleryTitle">{item.title}</h3>
                            <div className="galleryInfo">
                                <span className="regDate">{item.registrationDate}</span>
                                <span className="category">
                                    <ul>
                                        {
                                            item.categoryList.map(
                                                (category,index) =>
                                                    <li key={index}>{category}</li>
                                            )
                                        }
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <div className="headerRight">
                            <dl className="view">
                                <dt><FontAwesomeIcon icon={faEye}/></dt>
                                <dd>{item.viewCnt}</dd>
                            </dl>
                            <dl className="like">
                                <dt><FontAwesomeIcon icon={faHeart}/></dt>
                                <dd>{item.like}</dd>
                            </dl>
                            <dl className="comment">
                                <dt><FontAwesomeIcon icon={faComment}/></dt>
                                <dd>{item.commentList.length}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="detailBody">
                        <div className="detailContent">
                            {
                                item.contentList.map(
                                    (content,index) =>
                                        <div className="contentWrap" key={index} dangerouslySetInnerHTML={ {__html: content.content} }/>
                                )
                            }
                        </div>
                        <div className="btnBox">
                            <button><FontAwesomeIcon icon={faHeart}/> 좋아요 {item.like}</button>
                            <button><FontAwesomeIcon icon={faFolderPlus}/> 컬렉션 추가</button>
                        </div>
                    </div>
                    <div className="detailFooter">
                        <div className="hashtagList">
                            {
                                item.hashtagList.map(
                                    (hashtag,index) => <Link to={`/${hashtag}`} key={index}>{hashtag}</Link>
                                )
                            }
                        </div>
                        <div className="shareBox">

                        </div>
                        <div className="commentBox">
                            <div className="inputBox">
                                <Input type="textarea"/>
                            </div>
                            <div className="btnBox">
                                <button>댓글 작성</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <div className="modal-sidebar">
                <ul>
                    <li className="btnProfile">
                        <button className="btnIcon" style={{backgroundImage:`url(${item.member.profile})`}}></button>
                        <div className="btnName">프로필</div>
                    </li>
                    <li className="btnFollow">
                        <button className="btnIcon"><FontAwesomeIcon icon={faPlus}/></button>
                        <div className="btnName">팔로우</div>
                    </li>
                    <li className="btnRequest">
                        <button className="btnIcon"><FontAwesomeIcon icon={faEdit}/></button>
                        <div className="btnName">의뢰하기</div>
                    </li>
                    <li className="btnLike">
                        <button className="btnIcon"><FontAwesomeIcon icon={faHeart}/></button>
                        <div className="btnName">좋아요</div>
                    </li>
                    <li className="btnCollection">
                        <button className="btnIcon"><FontAwesomeIcon icon={faFolderPlus}/></button>
                        <div className="btnName">컬렉션</div>
                    </li>
                    <li className="btnShare">
                        <button className="btnIcon"><FontAwesomeIcon icon={faShareSquare}/></button>
                        <div className="btnName">공유하기</div>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default GalleryDetailModal;