
import React,{useState} from 'react';
import { Col, Row } from 'reactstrap';
import ResumeFormContents from '../../../components/contents/resume/ResumeFormContents';

const ResumeForm = () => {

    const [resumeTitle,setResumeTitle] = useState("이력서");
    const [openTitleInput, setOpenTitleInput] = useState(false);
    
    const handleTitleInput = () => {
        setOpenTitleInput(!openTitleInput);
    }

    const changeFormData = e => {
        console.log(e)
        switch(e.target.name){
            case "resumeTitle":
                setResumeTitle(e.target.value);
                break;
            default:
                return false;
        }
    }


    return (
        <div className="resumeForm">
            <Row>
                <Col md={9}>
                    <ResumeFormContents
                        openTitleInput={openTitleInput}
                        resumeTitle={resumeTitle}
                        changeFormData={changeFormData}
                        handleTitleInput={handleTitleInput}
                    />
                </Col>
                <Col md={3}>
                    <div style={{height:"300px",backgroundColor:"red"}}></div>
                </Col>
            </Row>
            
        </div>
    )
}

export default ResumeForm;