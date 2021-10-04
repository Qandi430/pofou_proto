import axios from 'axios';

const insertResume = (resumeForm) => (
    axios.post("/resume/insertResume",resumeForm)
);

const getResumeByMemberNumber = (memberNumber) => (
    axios.get("/resume/getResumeByMemberNumber",{params : {memberNumber : memberNumber}})
)

const changeRepresent = (memberNumber,resumeNumber) => (
    axios.put("/resume/changeRepresent",{memberNumber : memberNumber,resumeNumber : resumeNumber})
)

const deleteResume = (memberNumber,resumeNumber) => (
    axios.delete("/resume/deleteResume",{params : {memberNumber : memberNumber,resumeNumber : resumeNumber}})
)

const getResumeDetailByResumeNumber = (resumeNumber) => (
    axios.get("/resume/getResumeDetailByResumeNumber",{params : {resumeNumber : resumeNumber}})
)

const updateResume = (resumeForm) => (
    axios.put("/resume/updateResume",resumeForm)
)

export {
    insertResume,
    getResumeByMemberNumber,
    changeRepresent,
    deleteResume,
    getResumeDetailByResumeNumber,
    updateResume,
}