import axios from 'axios';

const getCategoryCodeList = () => (
    axios.get("/common/getCategoryCodeList")
)

export {
    getCategoryCodeList,
}