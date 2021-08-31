import axios from 'axios';

const getWorkList = (pageNo) => (
    axios.get("/main/getWorkList",{params:{pageNo:pageNo}})
);

export{
    getWorkList,
}