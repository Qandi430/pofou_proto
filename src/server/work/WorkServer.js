import axios from 'axios';

const upload = (uploadForm) => (
    axios.post("/work/upload",uploadForm)
);

const getWorkDetail = (workNumber) => (
    axios.get("/work/getWorkDetail",{params:{workNumber : workNumber}})
)

const insertLike = (workNumber,memberNumber) => (
    axios.post("/work/insertLike",{workNumber:workNumber,memberNumber:memberNumber})
)

const deleteLike = (workNumber,memberNumber) => (
    axios.delete("/work/deleteLike",{params:{workNumber:workNumber,memberNumber:memberNumber}})
)

const getWorkByWorkNumber = (workNumber) => (
    axios.get("/work/getWorkByWorkNumber",{params:{workNumber:workNumber}})
)

const insertComment = (commentForm) => (
    axios.post("/work/insertComment",commentForm)
)

const insertReComment = (commentForm) => (
    axios.post("/work/insertReComment",commentForm)
)

const getCommentListByWorkNumber = (workNumber) => (
    axios.get("/work/getCommentListByWorkNumber",{params:{workNumber:workNumber}})
)

const getWorkListByMemberNumber = (memberNumber) => (
    axios.get("/work/getWorkListByMemberNumber",{params:{memberNumber:memberNumber}})
)

const getLikeListByWorkNumber = (workNumber) => (
    axios.get("/work/getLikeListByWorkNumber", {params:{workNumber:workNumber}})
)

const getWorkDetailByWorkNumberAndUrl = (workNumber,url) => (
    axios.get("/work/getWorkDetailByWorkNumberAndUrl",{params:{workNumber:workNumber,url : url}})
)

const getLikedListByMemberNumber = (memberNumber) => (
    axios.get("/work/getLikedListByMemberNumber",{params:{memberNumber:memberNumber}})
)

const getCollectedListByMemberNumber = (memberNumber) => (
    axios.get("/work/getCollectedListByMemberNumber",{params:{memberNumber:memberNumber}})
)

const getTempWorkListByMemberNumber = (memberNumber) => (
    axios.get("/work/getTempWorkListByMemberNumber",{params:{memberNumber:memberNumber}})
)

const updateStatusByWorkNumber = (workNumber,status) => (
    axios.put("/work/updateStatusByWorkNumber",{workNumber : workNumber, status : status})
)

const deleteWorkByWorkNumber = (workNumber,memberNumber) => (
    axios.delete("/work/deleteWorkByWorkNumber",{params : {workNumber : workNumber,memberNumber : memberNumber}})
)

const getWorkDetailForUpdate = (workNumber) => (
    axios.get("/work/getWorkDetailForUpdate",{params : {workNumber : workNumber}})
)

export {
    upload,
    getWorkDetail,
    insertLike,
    deleteLike,
    getWorkByWorkNumber,
    insertComment,
    insertReComment,
    getCommentListByWorkNumber,
    getWorkListByMemberNumber,
    getLikeListByWorkNumber,
    getWorkDetailByWorkNumberAndUrl,
    getLikedListByMemberNumber,
    getCollectedListByMemberNumber,
    getTempWorkListByMemberNumber,
    updateStatusByWorkNumber,
    deleteWorkByWorkNumber,
    getWorkDetailForUpdate,
}