import axios from 'axios';

const upload = (uploadForm) => (
    axios.post("/work/upload",uploadForm)
);

const getWorkDetail = (workNumber) => (
    axios.get("/work/getWorkDetail",{params:{workNumber : workNumber}})
)

export {
    upload,
    getWorkDetail
}