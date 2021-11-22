import axios from 'axios';

const getWorkList = (pageNo) => (
    axios.get("/main/getWorkList",{params:{pageNo:pageNo}})
);

const getWorkListBySearchText = (searchText,pageNo) => (
    axios.get("/main/getWorkListBySearchText",{params : {searchText : searchText,pageNo : pageNo}})
)

export{
    getWorkList,
    getWorkListBySearchText,
}