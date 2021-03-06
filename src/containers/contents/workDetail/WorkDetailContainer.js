import React, { Fragment, useEffect, useState } from 'react'
import DetailBody from '../../../components/contents/workDetail/DetailBody';
import DetailFooter from '../../../components/contents/workDetail/DetailFooter';
import DetailHeader from '../../../components/contents/workDetail/DetailHeader';
import DetailSideBar from '../../../components/contents/workDetail/DetailSideBar';
import { createCommonConsumer } from '../../../context/commonContext';
import { getCommentListByWorkNumber, insertComment, insertReComment, insertLike, deleteLike } from '../../../server/work/WorkServer';
import { deleteCollection, deleteFollow, insertCollection, insertFollow } from '../../../server/member/MemberServer';
import '../../../resources/scss/contents/workDetail.scss';

const WorkDetailContainer = ({workDetail,loginMember,toggleLoginNoticeModal,toggleSpinnerModal,getLikeList,resetMemberInfo}) => {

    const [data,setData] = useState({
        memberNumber : "",
        workNumber : "",
        profileImage : "",
        name : "",
        email : "",
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
    });

    useEffect(() => {
        if(workDetail && workDetail.workNumber !== data.workNumber){
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
                commentList: [],
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
    },[workDetail]);

    const handleLike = async () => {
        if(loginMember === null || loginMember.memberNumber === ""){
            toggleLoginNoticeModal();
            return;
        }
        toggleSpinnerModal(true);
        if(data.likeList.find(like => like.memberNumber === loginMember.memberNumber) !== undefined){
            console.log("delete like");
            const {data : deleteResult} = await deleteLike(data.workNumber,loginMember.memberNumber);
            if(deleteResult){
                setData({
                    ...data,
                    likeList : data.likeList.filter(like => like.memberNumber !== loginMember.memberNumber)
                })
            }
        }else{
            console.log("insert like");
            const {data : likeResult} = await insertLike(data.workNumber,loginMember.memberNumber);
            if(likeResult){
                let newLike = {};
                newLike["memberNumber"] = loginMember.memberNumber;
                newLike["registrationDate"] = new Date();
                newLike["workNumber"] = data.workNumber;
                setData({
                    ...data,
                    likeList : data.likeList.concat(newLike)
                });
            }else{
                alert("????????? ??????????????????.");
            }
        }
        if(getLikeList !== undefined){
            getLikeList(data.workNumber);
        }
        toggleSpinnerModal(false);
    };

    const changeComment = value => {
        value = value.replace(/\n/g, '<br/>');
        setCommentForm({
            ...commentForm,
            commentContents : value
        });
    }

    const submitCommentForm = async() => {
        if(commentForm.commentContents === ""){
            alert("????????? ????????? ??????????????????.");
            return;
        }
        if(commentForm.memberNumber === ""){
            toggleLoginNoticeModal();
            return;
        }
        if(commentForm.workNumber === ""){
            alert("????????? ??????????????????.");
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
            alert("????????? ??????????????????.\n?????? ????????? ?????????.")
        }
        toggleSpinnerModal(false);
    };

    const openReCommnetInput = (commentNumber) => {
        setReCommentForm({
            ...reCommentForm,
            commentContents : "",
            reCommentNumber : commentNumber
        })
        document.getElementById(`detailReComment${commentNumber}`).value = "";
    };

    const closeReCommnetInput = (commentNumber) => {
        setReCommentForm({
            ...reCommentForm,
            commentContents : "",
            reCommentNumber : "",
        })
        document.getElementById(`detailReComment${commentNumber}`).value = "";
    };

    const changeReComment = (value) => {
        value = value.replace(/\n/g, '<br/>');
        setReCommentForm({
            ...reCommentForm,
            commentContents : value
        });
    };

    const submitReCommentForm = async() => {
        if(reCommentForm.commentContents === ""){
            alert("????????? ????????? ??????????????????.");
            return;
        }
        if(reCommentForm.memberNumber === ""){
            toggleLoginNoticeModal();
            return;
        }
        if(reCommentForm.reCommentNumber === ""){
            alert("????????? ??????????????????.");
            return;
        }
        if(reCommentForm.workNumber === ""){
            alert("????????? ??????????????????.");
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
            alert("????????? ??????????????????.\n?????? ????????? ?????????.")
        }
        toggleSpinnerModal(false);
    };

    const clickFollowButton = async () => {
        toggleSpinnerModal(true);
        const {data : followResult}  = await insertFollow(loginMember.memberNumber, data.memberNumber);
        if(followResult){
            alert("????????? ???????????????.");
            await resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("???????????? ?????????????????????.");
        }
        toggleSpinnerModal(false);
    }

    const clickCancelFollow = async() => {
        toggleSpinnerModal(true);
        const {data : cancelResult} = await deleteFollow(loginMember.memberNumber,data.memberNumber);
        if(cancelResult){
            alert("????????? ?????????????????????.");
            await resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("????????? ????????? ?????????????????????.");
        }
        toggleSpinnerModal(false);
    }

    const clickCollectionButton = async () => {
        if(loginMember === null || loginMember.memberNumber === ""){
            toggleLoginNoticeModal();
            return false;
        }
        toggleSpinnerModal(true);
        const {data : collectionResult} = await insertCollection(loginMember.memberNumber,data.workNumber);
        if(collectionResult){
            alert("???????????? ?????????????????????.");
            await resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("????????? ????????? ?????????????????????.");
        }
        toggleSpinnerModal(false);
    }

    const clickCancelCollection = async () => {
        toggleSpinnerModal(true);
        if(loginMember === null || loginMember.memberNumber === ""){
            toggleLoginNoticeModal();
            return false;
        }
        const {data : cancelResult} = await deleteCollection(loginMember.memberNumber,data.workNumber);
        if(cancelResult){
            alert("??????????????? ?????????????????????.");
            await resetMemberInfo(loginMember.memberNumber);
        }else{
            alert("????????? ????????? ?????????????????????.")
        }
        toggleSpinnerModal(false);
    }

    return (
        <div className="workDetail">
            <div className="detailWrap">
                <DetailHeader data={data} loginMember={loginMember}/>
                <DetailBody data={data}/>
                <DetailFooter data={data} loginMember={loginMember} openReCommnetInput={openReCommnetInput} reCommentForm={reCommentForm} submitReCommentForm={submitReCommentForm} closeReCommnetInput={closeReCommnetInput} commentForm={commentForm} changeComment={changeComment} changeReComment={changeReComment} submitCommentForm={submitCommentForm}/>
            </div>
            <DetailSideBar data={data} loginMember={loginMember} handleLike={handleLike} clickCancelCollection={clickCancelCollection} clickCollectionButton={clickCollectionButton} clickFollowButton={clickFollowButton} clickCancelFollow={clickCancelFollow}/>
        </div>
    )
}

export default createCommonConsumer(WorkDetailContainer);
