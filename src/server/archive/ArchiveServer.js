import axios from 'axios';

const getArchive = (url) => (
    axios.get("/archive/getArchive",{params:{url:url}})
)

const uploadBackgroundImage = (form) => (
    axios.post("/archive/uploadBackgroundImage",form)
)

const saveBackgroundImage = (memberNumber,fileName) => (
    axios.put("/archive/saveBackgroundImage",{memberNumber:memberNumber,backgroundImage:fileName})
)

export {
    getArchive,
    uploadBackgroundImage,
    saveBackgroundImage,
}