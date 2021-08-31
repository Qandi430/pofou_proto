import { faComments, faEye, faHeart, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faFolderPlus, faPlus, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { Input, Modal } from 'reactstrap';
import moment from 'moment';
const WorkDetailModal = ({isOpen,toggle,workDetail,loginMember}) => {
    
    const [data,setData] = useState({
        memberNumber : "",
        workNumber : "",
        profileImage : "",
        name : "",
        keyword1 : "",
        keyword2 : "",
        title : "",
        backgroundColor : "#FFFFFF",
        margin : 0,
        thumbnail : "",
        category1 : "",
        category2 : "",
        tag : "",
        copyright : "",
        status : "",
        registrationDate : new Date(),
        contentsList : [
            
        ],
    });

    useEffect(()=>{
        if(workDetail){
            setData(workDetail);
        }else{
            setData({
                memberNumber : "",
                workNumber : "",
                profileImage : "",
                name : "",
                keyword1 : "",
                keyword2 : "",
                title : "",
                backgroundColor : "#FFFFFF",
                margin : 0,
                thumbnail : "",
                category1 : "",
                category2 : "",
                tag : "",
                copyright : "",
                status : "",
                registrationDate : new Date(),
                contentsList : [
                    
                ],
            })
        }
    },[workDetail]);
    
    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="workDetailModal">
            <div className="detailWrap">
                <div className="detailHeader">
                    <div className="headerLeft">
                        <h3 className="title">{data.title}</h3>
                        <div className="registrationDate">{moment(data.registrationDate).format('YYYY.MM.DD')}</div>
                        {
                            data.category1 !== "" || data.category2 !== "" ?
                            <div className="category">
                                {
                                    data.category1 !== "" && <span>{data.category1}</span>
                                }
                                {
                                    data.category2 !== "" && <span>{data.category2}</span>
                                }
                            </div>
                            : ""
                        }
                    </div>
                    <div className="headerRight">
                        <div className="viewCnt">
                            <FontAwesomeIcon icon={faEye}/>
                            <span>0</span>
                        </div>
                        <div className="likeCnt">
                            <FontAwesomeIcon icon={faHeart}/>
                            <span>0</span>
                        </div>
                        <div className="commentCnt">
                            <FontAwesomeIcon icon={faComments}/>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className="detailBody" style={{backgroundColor : `${data.backgroundColor}`}}>
                    {
                        data.contentsList.map(
                            contents => {
                                // const parser = JSON.parse(contents);
                                return contents.type !== "video" ?<div 
                                                key={contents.order} 
                                                className={`contents ${contents.type}`} 
                                                style={{margin:`${contents.order > 0 ? data.margin : 0}px 0`}}  
                                                dangerouslySetInnerHTML={{__html:contents.contents}}
                                        /> : <VideoContents key={contents.order} order={contents.order} contents={contents.contents} margin={data.margin}/>
                            }
                                
                        )
                    }
                </div>
                <div className="detailFooter">
                    <div className="btnBox">
                        <button className="btnLike">
                            <FontAwesomeIcon icon={faHeart}/> 좋아요 0
                        </button>
                        <button className="btnCollection">
                            <FontAwesomeIcon icon={faPlusSquare}/> 컬렉션 추가
                        </button>
                    </div>
                    <div className="tagBox">
                        <ul>
                            {
                                data.tag !== "" &&
                                    data.tag.split(",").map(
                                        (tag,index) => <li key={index}>{tag}</li>
                                    )
                            }
                        </ul>
                    </div>
                    <div className="infoBox">
                        <div className="copyright"></div>
                        <div className="shareBox"></div>
                    </div>
                    <div className="commentBox">
                        <div className="commentList"></div>
                        {
                            loginMember !== null && loginMember.memberNumber !=="" &&
                            <div className="inputBox">
                                <div className="profile">
                                    <div className="profileImage" style={ loginMember !== null && loginMember.profileImage !== null && loginMember.profileImage !== undefined ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${loginMember.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                        {
                                            loginMember !== null && loginMember.profileImage !== null && loginMember.profileImage !== undefined  ?
                                            "" : loginMember.member === null ? "P" : loginMember.email.split("")[0].toUpperCase()
                                        }
                                    </div>
                                </div>
                                <Input type="textarea"></Input>
                                <button>댓글작성</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="detailSidebar">
                <ul>
                    <li className="btnProfile">
                        <button className="btnIcon" style={ data.profileImage !== null ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${data.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                            {
                                data.profileImage === ""  &&  "P"
                            }
                        </button>
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
        </Modal>
    )
}

const VideoContents = ({order,contents,margin}) =>{
    const [iframe,setIframe] = useState("");
    useEffect(() => {
        if(contents !== null && contents !== undefined){
            const parser = JSON.parse(contents);
            setIframe(parser.iframe);
        }
    },[contents])
    return(
        <div className="contents video" key={order} style={{margin:`${order > 0 ? margin : 0}px 0`}}  dangerouslySetInnerHTML={{__html: iframe}}/>
            
    )
}

export default WorkDetailModal;