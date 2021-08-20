import axios from 'axios';

const getCategoryCodeList = () => (
    axios.get("/common/getCategoryCodeList")
)

const singleFileUpload = (form) => (
    axios.post("/common/singleFileUpload",form)
)

export {
    getCategoryCodeList,
    singleFileUpload,
}