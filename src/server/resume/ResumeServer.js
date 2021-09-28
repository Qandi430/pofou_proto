import axios from 'axios';

const insertResume = (resumeForm) => (
    axios.post("/resume/insertResume",resumeForm)
);

export {
    insertResume,
}