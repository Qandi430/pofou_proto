
import React,{useEffect, useState} from 'react';
import { Col, Row } from 'reactstrap';
import ResumeFormContents from '../../../components/contents/resume/ResumeFormContents';
import EducationAdditionalModal from '../../../components/contents/resume/EducationAdditionalModal';
import CertificateSearchModal from '../../../components/contents/resume/CetificateSearchModal';
import CareerAdditiaonalModal from '../../../components/contents/resume/CareeaAdditionalModal';

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
        certificateList : [],
        carrerList : [],
        languageList: [],
        awardsList : [],
        abroadsList : [],
        preferred : {
            veteran : "",
            disabledWhether : "",
            militaryServiceStatus : "",
            militaryStartYear : "",
            militaryStartMonth : "",
            militaryEndYear : "",
            militaryEndMonth : "",
            mos : "",
            militaryClasses : "",
        },
    });
    const [openEducationAdditionalModal,setOpenEducationAdditionalModal] = useState(false);
    const [modifyEducationForm,setModifyEducationForm] = useState(null);
    const [openCertificateSearchModal,setOpenCertificateSearchModal] = useState(false);
    const [certificateSearchIndex,setCertificateSearchIndex] = useState(0);
    const [openCareerAdditionalModal,setOpenCareerAdditionalModal] = useState(false);
    const [modifyCareerForm,setModifyCareerForm] = useState(null);

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

    const changePreferredData = e => {
        const {value,name} = e.target;

        setFormData({
            ...formData,
            preferred : {
                ...formData.preferred,
                [name]:value
            }
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

    const addCertificateList = e => {
        e.preventDefault();
        setFormData({
            ...formData,
            certificateList : formData.certificateList.concat({
                index: formData.certificateList.length,
                certificateName : "",
                certificateIssuer : "",
                certificateGrade : "",
                certificateIssueDate : new Date(),
            })
        })   
    }

    const changteCertificateData = (name,value,index) => {
        let certificateList = formData.certificateList;
        console.log(name,value,index)
        certificateList[index][name] = value;

        setFormData({
            ...formData,
            certificateList : certificateList
        })
    }

    const handleCertificateSearchModal = (e,index) => {
        e.preventDefault();
        if(index !== undefined){
            setCertificateSearchIndex(index);
            setOpenCertificateSearchModal(true);
        }else{
            setCertificateSearchIndex(0);
            setOpenCertificateSearchModal(false);
        }
    }

    const handleCareerAdditionalModal = e => {
        e.preventDefault();
        setOpenCareerAdditionalModal(!openCareerAdditionalModal);
        
        if(openCareerAdditionalModal){
            console.log("modify form is null")
            setModifyCareerForm(null);
        }
    }

    const addCareer = careerForm =>{
        careerForm["index"] = formData.carrerList.length;
        setFormData({
            ...formData,
            carrerList : formData.carrerList.concat(careerForm)
        });
        setOpenCareerAdditionalModal(false);
    }

    const removeCareer = (e,index) => {
        e.preventDefault();
        if(window.confirm("해당 경력을 삭제하시겠습니까?")){
            setFormData({
                ...formData,
                carrerList: formData.carrerList.filter(career => career.index !== index)
            })
        }
    }

    const modifyCareer = (e,index) => {
        e.preventDefault();
        setModifyCareerForm(formData.carrerList.find(career => career.index === index));
        setOpenCareerAdditionalModal(true);
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
                        addCertificateList = {addCertificateList}
                        changteCertificateData = {changteCertificateData}
                        handleCertificateSearchModal={handleCertificateSearchModal}
                        handleCareerAdditionalModal={handleCareerAdditionalModal}
                        modifyCareer = {modifyCareer}
                        removeCareer = {removeCareer}
                        changePreferredData = {changePreferredData}
                    />
                </Col>
                <Col md={3}>
                    <div style={{height:"300px",backgroundColor:"red"}}></div>
                </Col>
            </Row>
            <EducationAdditionalModal isOpen={openEducationAdditionalModal} toggle={handleEducationAdditionalModal} addEducation={addEducation} modifyEducationForm={modifyEducationForm}/>
            <CertificateSearchModal isOpen={openCertificateSearchModal} toggle={handleCertificateSearchModal} index={certificateSearchIndex} changteCertificateData={changteCertificateData}/>
            <CareerAdditiaonalModal isOpen={openCareerAdditionalModal} toggle={handleCareerAdditionalModal} modifyCareerForm={modifyCareerForm} addCareer={addCareer}/>
        </div>
    )
}

export default ResumeForm;