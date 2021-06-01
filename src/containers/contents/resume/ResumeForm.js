
import React,{useEffect, useState} from 'react';
import { Col, Row } from 'reactstrap';
import ResumeFormContents from '../../../components/contents/resume/ResumeFormContents';
import EducationAdditionalModal from '../../../components/contents/resume/EducationAdditionalModal';

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
        educationList : [
            {
                index : 0,
                educationType : "univercity",
                educationName : "연성대학교",
                majorList : [
                    {
                        index : 0,
                        degreeType : "Associate",
                        majorType : "major",
                        majorName : "푸드스타일링",
                    },
                    {
                        index : 1,
                        degreeType : "Associate",
                        majorType : "double",
                        majorName : "호텔조리학과",
                    },
                ],
                highScoolMajor : "",
                admissionYear : "2012",
                graduatedYear : "2014",
                graduatedType : "graduate",
                educationContent : "",
            },
            {
                index : 1,
                educationType : "highSchool",
                educationName : "잠실고등학교",
                majorList : [
                    
                ],
                highScoolMajor : "Meister",
                admissionYear : "2006",
                graduatedYear : "2009",
                graduatedType : "graduate",
                educationContent : "",
            }
        ],
    });
    const [openEducationAdditionalModal,setOpenEducationAdditionalModal] = useState(false);
    const [modifyEducationForm,setModifyEducationForm] = useState(null);

    useEffect(() => {
        if(!openEducationAdditionalModal){
            setModifyEducationForm(null);
        }
    },[openEducationAdditionalModal])

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

    const addEducation = educationForm => {

        if(educationForm.educationType === ""){
            alert("학교 구분을 선택해 주세요.");
            return false;
        }
        if(educationForm.educationName === ""){
            alert("학교명을 입력해 주세요.");
            return false;
        }
        if(educationForm.educationType === "univercity"){
            if(educationForm.majorList.length < 1){
                alert("전공을 입력해 주세요.");
                return false;
            }
            for(let i = 0; i< educationForm.majorList.length; i ++){
                if(educationForm.majorList[i].degreeType  === ""){
                    alert("학위 유형을 선택해 주세요.");
                    return false;
                }
                if(educationForm.majorList[i].majorType === ""){
                    alert("전공 유형을 선택해 주세요.");
                    return false;
                }
                if(educationForm.majorList[i].majorName === ""){
                    alert("전공 이름을 입력해 주세요.");
                    return false;
                }
            }
        }else{
            if(educationForm.highScoolMajor === ""){
                alert("전공을 입력해 주세요.");
                return false;
            }
        }
        
        if(educationForm.admissionYear === ""){
            alert("입학 년도를 입력해 주세요.");
            return false;
        }
        if(educationForm.graduatedYear === ""){
            if(educationForm.graduatedType !== "enrollment"){
                alert("졸업 년도를 입력해주세요.");
                return false
            }
        }
        if(educationForm.graduatedType === ""){
            alert("졸업 유형을 선택해 주세요.");
            return false;
        }
        educationForm["index"] = formData.educationList.length;
        setFormData({
            ...formData,
            educationList : formData.educationList.concat(educationForm)
        });
        setOpenEducationAdditionalModal(false);
    }

    const removeEducation = (e,index) => {
        e.preventDefault();
        if(window.confirm("해당 학력을 삭제하시겠습니까?")){
            setFormData({
                ...formData,
                educationList: formData.educationList.filter(education => education.index !== index)
            })
        }
    }

    const modifyEducation = (e,index) => {
        e.preventDefault();
        setModifyEducationForm(formData.educationList.find(education => education.index === index));
        setOpenEducationAdditionalModal(true);
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
                        removeEducation = {removeEducation}
                        modifyEducation = {modifyEducation}
                        modifyEducationForm = {modifyEducationForm}
                    />
                </Col>
                <Col md={3}>
                    <div style={{height:"300px",backgroundColor:"red"}}></div>
                </Col>
            </Row>
            <EducationAdditionalModal isOpen={openEducationAdditionalModal} toggle={handleEducationAdditionalModal} addEducation={addEducation} modifyEducationForm={modifyEducationForm}/>
        </div>
    )
}

export default ResumeForm;