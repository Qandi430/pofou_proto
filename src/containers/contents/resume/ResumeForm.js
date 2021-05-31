
import React,{useState} from 'react';
import { Col, Row } from 'reactstrap';
import ResumeFormContents from '../../../components/contents/resume/ResumeFormContents';
import EducationAdditionalModal from './EducationAdditionalModal';

const ResumeForm = () => {

    const [openTitleInput, setOpenTitleInput] = useState(false);
    const [formData,setFormData] = useState({
        title: "이력서",
        name : "",
        birthYear : "",
        birthMonth : "",
        birthDay : "",
        gender : "",
        phone : "",
        mobile : "",
        email : "",
        sns : "",
        address : "",
        educationList : [],
    });
    const [openEducationAdditionalModal,setOpenEducationAdditionalModal] = useState(false);

    const handleTitleInput = () => {
        setOpenTitleInput(!openTitleInput);
    }

    const handleEducationAdditionalModal = e => {
        e.preventDefault();
        setOpenEducationAdditionalModal(!openEducationAdditionalModal);
    }

    const changeFormData = e => {
        const {value,name} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const addEducation = eucationForm => {
        setFormData({
            ...formData,
            educationList : formData.educationList.concat(eucationForm)
        });
        setOpenEducationAdditionalModal(false);
    }

    return (
        <div className="resumeForm">
            <Row>
                <Col md={9}>
                    <ResumeFormContents
                        formData={formData}
                        openTitleInput={openTitleInput}
                        changeFormData={changeFormData}
                        handleTitleInput={handleTitleInput}
                        handleEducationAdditionalModal={handleEducationAdditionalModal}
                    />
                </Col>
                <Col md={3}>
                    <div style={{height:"300px",backgroundColor:"red"}}></div>
                </Col>
            </Row>
            <EducationAdditionalModal isOpen={openEducationAdditionalModal} toggle={handleEducationAdditionalModal} addEducation={addEducation}/>
        </div>
    )
}

export default ResumeForm;