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

export {
    upload,
    getWorkDetail,
    insertLike,
    deleteLike,
    getWorkByWorkNumber,
}