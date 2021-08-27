import axios from 'axios';

const getCategoryCodeList = () => (
    axios.get("/common/getCategoryCodeList")
)

const singleFileUpload = (form) => (
    axios.post("/common/singleFileUpload",form)
)

const multiFileUpload = (form) => (
    axios.post("/common/multiFileUpload",form,{headers : {"Content-Type": "multipart/form-data"}})
)

export {
    getCategoryCodeList,
    singleFileUpload,
    multiFileUpload,
}