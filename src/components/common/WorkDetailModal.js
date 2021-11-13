import { faComments, faEye, faHeart as emptyHeart, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faFolderPlus, faPlus, faShareSquare, faHeart as fullHeart, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { Input, Modal } from 'reactstrap';
import moment from 'moment';
import { getCommentListByWorkNumber, insertComment, insertReComment } from '../../server/work/WorkServer';
import { deleteFollow, insertCollection, insertFollow } from '../../server/member/MemberServer';
import {createCommonConsumer} from '../../context/commonContext';
const WorkDetailModal = ({isOpen,toggle,workDetail,loginMember,clickLikeButton,toggleSpinnerModal,resetMemberInfo}) => {
    
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
        likeList : [],
        viewCnt : 0,
        contentsList : [
            
        ],
        commentList: [],
    });

    const [commentForm,setCommentForm] = useState({
        memberNumber : "",
        workNumber : "",
        commentContents : "",
        reCommentList : [],
    });

    const [reCommentForm,setReCommentForm] = useState({
        memberNumber : "",
        workNumber : "",
        reCommentNumber : "",
        commentContents : "",
    })

    useEffect(()=>{
        if(workDetail){
            if(workDetail.workNumber !== data.workNumber){
                setData(workDetail);
                setCommentForm({
                    ...commentForm,
                    workNumber : workDetail.workNumber,
                    memberNumber : loginMember!== null ? loginMember.memberNumber : "",
                });
                setReCommentForm({
                    ...reCommentForm,
                    workNumber : workDetail.workNumber,
                    memberNumber : loginMember!== null ? loginMember.memberNumber : "",
                });
            }
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
            setCommentForm({
                memberNumber : "",
                workNumber : "",
                commentContents : "",
            });
            setReCommentForm({
                memberNumber : "",
                workNumber : "",
                commentContents : "",
                reCommentNumber : "",
            });
        }
    },[workDetail,loginMember]);
    
    const handleLike = (workNumber) => {
        clickLikeButton(workNumber);
    }

    const dateConvert = (date) => {
        if(date !== undefined){
            const now = new Date();
            const target = new Date(date);
            // console.log(now,target);
            let result = now - target;
            // console.log(result,result/1000,result/(1000 * 60),result/(1000 * 60 * 60),result/(1000*60*60*24));
            if(60>result/1000){
                return `${Math.floor(result/1000)}초 전`;
            }else if(60>result/(1000*60)){
                return `${Math.floor(result/(1000*60))}분 전`;
            }else if(24 > result/(1000*60*60)){
                return `${Math.floor(result/(1000*60*60))}시간 전`;
            }else if(7 > result/(1000*60*60*24)){
                return `${Math.floor(result/(1000*60*60*24))}일 전`;
            }else{
                return moment(data.registrationDate).format('YYYY.MM.DD');
            }
        }
    };

    const changeComment = (value) => {
        value = value.replace(/\n/g, '<br/>');
        setCommentForm({
            ...commentForm,
            commentContents : value
        })
    }

    const convertBr = text => {
        const result = text.replace(/<br\s*\/?>/mg,"\n");
        return result;
    }

    const submitCommentForm = async() => {
        if(commentForm.commentContents === ""){
            alert("댓글의 내용이 비어있습니다.");
            return;
        }
        if(commentForm.memberNumber === ""){
            alert("로그인시 이용 가능합니다.");
            return;
        }
        if(commentForm.workNumber === ""){
            alert("오류가 발생했습니다.");
            return;
        }
        toggleSpinnerModal(true);
        const {data : commentResult} = await insertComment(commentForm);
        
        if(commentResult){
            const {data : commentList} = await getCommentListByWorkNumber(commentForm.workNumber);
            setData({
                ...data,
                commentList : commentList
            })
            setCommentForm({
                ...commentForm,
                commentContents : "",
            })
            document.getElementById("detailComment").value = "";
        }else{
            alert("오류가 발생했습니다.\n다시 시도해 주세요.")
        }
        toggleSpinnerModal(false);
    }

    const openReCommnetInput = (commentNumber) => {
        setReCommentForm({
            ...reCommentForm,
            commentContents : "",
            reCommentNumber : commentNumber
        })
        document.getElementById(`detailReComment${commentNumber}`).value = "";
    }

    const closeReCommnetInput = (commentNumber) => {
        setReCommentForm({
            ...reCommentForm,
            commentContents : "",
            reCommentNumber : "",
        })
        document.getElementById(`detailReComment${commentNumber}`).value = "";
    }

    const changeReComment = (value) => {
        value = value.replace(/\n/g, '<br/>');
        setReCommentForm({
            ...reCommentForm,
            commentContents : value
        });
    }

    const submitReCommentForm = async() => {
        if(reCommentForm.commentContents === ""){
            alert("댓글의 내용이 비어있습니다.");
            return;
        }
        if(reCommentForm.memberNumber === ""){
            alert("로그인시 이용 가능합니다.");
            return;
        }
        if(reCommentForm.reCommentNumber === ""){
            alert("오류가 발생했습니다.");
            return;
        }
        if(reCommentForm.workNumber === ""){
            alert("오류가 발생했습니다.");
            return;
        }
        toggleSpinnerModal(true);
        const {data : reCommentResult} = await insertReComment(reCommentForm);
        
        if(reCommentResult){
            const {data : commentList} = await getCommentListByWorkNumber(commentForm.workNumber);
            setData({
                ...data,
                commentList : commentList
            });
            document.getElementById(`detailReComment${reCommentForm.reCommentNumber}`).value = "";
            setReCommentForm({
                ...reCommentForm,
                commentContents : "",
                reCommentNumber : "",
            })
        }else{
            alert("오류가 발생했습니다.\n다시 시도해 주세요.")
        }
        toggleSpinnerModal(false);
    }

    const clickFollowButton = async () => {
        const {data : followResult}  = await insertFollow(loginMember.memberNumber, data.memberNumber);
        if(followResult){
            alert("팔로우 하였습니다.");
            resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("팔로우에 실패하였습니다.");
        }
    }

    const clickCancelFollow = async() => {
        const {data : cancelResult} = await deleteFollow(loginMember.memberNumber,data.memberNumber);
        if(cancelResult){
            alert("팔로우 취소하였습니다.");
            resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("팔로우 취소에 실패하였습니다.");
        }
    }

    const clickCollectionButton = async () => {
        const {data : collectionResult} = await insertCollection(loginMember.memberNumber,data.workNumber);
        if(collectionResult){
            alert("컬렉션에 추가되었습니다.");
        }else{
            alert("컬렉션 추가에 실패하였습니다.");
        }
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} centered id="workDetailModal">
            <div className="detailWrap">
                <div className="detailHeader">
                    <div className="headerLeft">
                        <h3 className="title">{data.title}</h3>
                        <div className="registrationDate">
                            { dateConvert(data.registrationDate) }
                        </div>
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
                            <span>{data.viewCnt}</span>
                        </div>
                        <div className="likeCnt">
                            {
                                loginMember !== null && loginMember.memberNumber !== "" && data.likeList !== null && data.likeList !== undefined && data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>
                            }
                            <span>{data.likeList !== null && data.likeList !== undefined ? data.likeList.length : 0}</span>
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
                        <button className="btnLike" onClick={() => handleLike(data.workNumber)}>
                            {
                                loginMember !== null && loginMember.memberNumber !== "" && data.likeList !== null && data.likeList !== undefined && data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>
                            }
                            &nbsp;좋아요 {data.likeList !== null && data.likeList !== undefined ? data.likeList.length : 0}
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
                        <div className="commentList">
                            <ul>
                                {
                                    data.commentList.map(
                                        comment => 
                                            <li key={comment.commentNumber}>
                                                <div className="profile">
                                                    <div className="profileImage" style={ comment.profileImage !== null || comment.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${comment.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                                        {
                                                            comment.profileImage !== null ?
                                                            "" : comment.email === null ? "P" : comment.email.split("")[0].toUpperCase()
                                                        }
                                                    </div>
                                                </div>
                                                <div className="contentsBox">
                                                    <div className="info"><h6>{comment.name}</h6><span>{dateConvert(comment.registrationDate)}</span></div>
                                                    <div className="contents" dangerouslySetInnerHTML={{__html:comment.commentContents}}/>
                                                    {
                                                        loginMember !== null && loginMember.memberNumber !== "" &&
                                                        <button onClick={() => openReCommnetInput(comment.commentNumber)}>답글 남기기</button>
                                                    }
                                                    
                                                </div>
                                                <div className="reCommentList">
                                                    <ul>
                                                        {
                                                            comment.reCommentList.map(
                                                                reComment =>
                                                                    <li key={reComment.commentNumber}>
                                                                        <div className="profile">
                                                                            <div className="profileImage" style={ reComment.profileImage !== null || reComment.profileImage !=="" ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${reComment.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                                                                {
                                                                                    reComment.profileImage !== null ?
                                                                                    "" : reComment.email === null ? "P" : reComment.email.split("")[0].toUpperCase()
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="contentsBox">
                                                                            <div className="info"><h6>{reComment.name}</h6><span>{dateConvert(reComment.registrationDate)}</span></div>
                                                                            <div className="contents" dangerouslySetInnerHTML={{__html:reComment.commentContents}}/>
                                                                        </div>
                                                                    </li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                                {
                                                    loginMember !== null && loginMember.memberNumber !=="" &&
                                                    <div className={`reCommentInputBox ${reCommentForm.reCommentNumber === comment.commentNumber ? "open":""}`}>
                                                        <div className="profile">
                                                            <div className="profileImage" style={ loginMember !== null && loginMember.memberNumber !== "" && loginMember.profileImage !== null && loginMember.profileImage !== undefined ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${loginMember.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                                                {
                                                                    loginMember !== null&& loginMember.memberNumber !== "" && loginMember.profileImage !== null && loginMember.profileImage !== undefined  ?
                                                                    "" : loginMember.member === null ? "P" : loginMember.email.split("")[0].toUpperCase()
                                                                }
                                                            </div>
                                                        </div>
                                                        <Input id={`detailReComment${comment.commentNumber}`} type="textarea" defaultValue={convertBr(reCommentForm.commentContents)} onChange={e => changeReComment(e.target.value)}></Input>
                                                        <div className="btnBox">
                                                            <button onClick={submitReCommentForm}>댓글작성</button>
                                                            <button onClick={() => closeReCommnetInput(comment.commentNumber)}>취소</button>
                                                        </div>
                                                    </div>
                                                }
                                            </li>            
                                    )
                                }
                            </ul>
                        </div>
                        {
                            loginMember !== null && loginMember.memberNumber !=="" &&
                            <div className="inputBox">
                                <div className="profile">
                                    <div className="profileImage" style={ loginMember !== null && loginMember.profileImage !== null && loginMember.profileImage !== undefined ? {backgroundImage:`url(https://storage.googleapis.com/pofou_repo/${loginMember.profileImage})`} : {backgroundColor:"#e8e8e8"}}>
                                        {
                                            loginMember !== null && loginMember.memberNumber !== "" && loginMember.profileImage !== null && loginMember.profileImage !== undefined  ?
                                            "" : loginMember.member === null ? "P" : loginMember.email.split("")[0].toUpperCase()
                                        }
                                    </div>
                                </div>
                                <Input id="detailComment" type="textarea" defaultValue={convertBr(commentForm.commentContents)} onChange={e => changeComment(e.target.value)}></Input>
                                <button onClick={submitCommentForm}>댓글작성</button>
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
                    <li className="btnRequest">
                        <button className="btnIcon"><FontAwesomeIcon icon={faEdit}/></button>
                        <div className="btnName">의뢰하기</div>
                    </li>
                    <li className="btnLike">
                        <button className="btnIcon" onClick={() => clickLikeButton(data.workNumber)}>
                            {
                                loginMember !== null && loginMember.memberNumber !== "" && data.likeList !== null && data.likeList !== undefined && data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined ? <FontAwesomeIcon icon={fullHeart} className="fullHeart"/>:<FontAwesomeIcon icon={emptyHeart}/>
                            }
                        </button>
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

export default createCommonConsumer(WorkDetailModal);