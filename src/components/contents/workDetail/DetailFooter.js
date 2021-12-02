import React from 'react'
import { dateConvert,convertBr } from '../../common/CommonScript';
import {Input} from 'reactstrap';

const DetailFooter = ({data,loginMember,openReCommnetInput,reCommentForm,submitReCommentForm,closeReCommnetInput,commentForm,changeComment,changeReComment,submitCommentForm}) => {
    return (
        <div className="detailFooter">
            <div className="tagBox">
                <ul>
                    {
                        data.tag !== "" &&
                            data.tag.split(",").map(
                                (tag,index) => <li key={index}>{tag}</li>
                            )
                    }
                </ul>
                <div className="registrationDate">
                    { dateConvert(data.registrationDate) }
                </div>
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
                        <button onClick={submitCommentForm}>작성</button>
                    </div>
                }
            </div>
        </div>
    )
}


export default DetailFooter
