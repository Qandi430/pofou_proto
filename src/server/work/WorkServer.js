import axios from 'axios';

const upload = (uploadForm) => (
    axios.post("/work/upload",uploadForm)
);

export {
    upload,
}