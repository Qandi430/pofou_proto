
import React,{useEffect, useState} from 'react';
import { Col, Form, Row } from 'reactstrap';
import EducationAdditionalModal from '../../../components/contents/resume/EducationAdditionalModal';
import BasicInfo from '../../../components/contents/resume/BasicInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import Education from '../../../components/contents/resume/Education';
import Career from '../../../components/contents/resume/Career';
import Certificate from '../../../components/contents/resume/Certificate';
import Preferential from '../../../components/contents/resume/Preferential';
import Skill from '../../../components/contents/resume/Skill';
import Activity from '../../../components/contents/resume/Activity';
import Introduction from '../../../components/contents/resume/Introduction';
import ResumeSidebar from '../../../components/contents/resume/ResumeSidebar';
import { getResumeDetailByResumeNumber } from '../../../server/resume/ResumeServer';
const ResumeForm = ({openSpinnerModal,toggleSpinnerModal,loginMember,history,match,openResumeDetailModal}) => {
    const [resumeNumber,setResumeNumber] = useState(-1);
    const [openTitleInput, setOpenTitleInput] = useState(false);
    const [formData,setFormData] = useState({
        memberNumber:  "",
        title: "이력서",
        name : "",
        photo : "",
        displayPhoto : false,
        birthDate : "",
        gender : "M",
        phone : "",
        mobile : "",
        email : "",
        address : "",
        baseAddress : "",
        detailAddress : "",
        zipCode : "",
        complete : "",
        educationList : [
            
        ],
        careerType : "experienced",
        careerList : [
            {
                careerName : "",
                careerRole : "",
                careerStart : "",
                careerEnd : "",
                quit : true,
                careerContent : "",
            }
        ],
        displayActivity : true,
        activityList : [
            {
                activityType : "",
                activityPlace : "",
                activityStart : "",
                activityEnd : "",
                activityContent:  "",
            }
        ],
        displayCertificate : true,
        certificateList : [
            {
                cartificateType : "license",
                certificateLanguage : "",
                certificateName : "",
                certificateIssuer : "",
                certificatePassType : "",
                certificateDate : "",
                certificateScore : "",
                certificateGrade : "",
            },
        ],
        displayPreferred : true,
        preferred : {
            veteran : false,
            disabledWhether : "",
            militaryServiceStatus : "",
            militaryStartYear : "",
            militaryStartMonth : "",
            militaryEndYear : "",
            militaryEndMonth : "",
            mos : "",
            militaryClasses : "",
        },
        displaySkill : true,
        skillList : [
            
        ],
        displayIntroduction : true,
        introductionList : [
            {
                title : "",
                content : "",
                order : 0,
            }
        ],
    });

    useEffect(() => {
        if(formData.memberNumber !== loginMember.memberNumber){
            setFormData({
                ...formData,
                memberNumber : loginMember.memberNumber,
            })
        }
    },[loginMember,formData]);

    useEffect(() => {
        if(match.params.resumeNumber !== undefined && match.params.resumeNumber !== resumeNumber){
            // console.log("update")
            // getResume(match.params.resumeNumber);
            setResumeNumber(match.params.resumeNumber);
            getResume(match.params.resumeNumber);
        }
    },[match,resumeNumber]);

    const [openEducationAdditionalModal,setOpenEducationAdditionalModal] = useState(false);
    const [modifyEducationForm,setModifyEducationForm] = useState(null);
    

    useEffect(() => {
        if(!openEducationAdditionalModal){
            setModifyEducationForm(null);
        }
    },[openEducationAdditionalModal]);

    const getResume = async(resumeNumber) => {
        // console.log("update",resumeNumber);
        toggleSpinnerModal(true);
        const {data : resume}  = await getResumeDetailByResumeNumber(resumeNumber);
        
        resume.birthDate = new Date(resume.birthDate);
        if(resume.careerList.length > 0){
            resume.careerList = resume.careerList.map(career => ({...career, careerStart : new Date(career.careerStart), careerEnd : new Date(career.careerEnd)}));
        }else{
            resume.careerList.push({
                careerName : "",
                careerRole : "",
                careerStart : "",
                careerEnd : "",
                quit : true,
                careerContent : "",
            })
        }
        
        
        if(resume.activityList.length === 0){
            resume.activityList.push({
                activityType : "",
                activityPlace : "",
                activityStart : "",
                activityEnd : "",
                activityContent:  "",
            });
        }else{
            resume.activityList = resume.activityList.map(activity => ({...activity, activityStart : new Date(activity.activityStart), activityEnd : new Date(activity.activityEnd)}));
        }

        if(resume.certificateList.length === 0){
            resume.certificateList.push({
                cartificateType : "license",
                certificateLanguage : "",
                certificateName : "",
                certificateIssuer : "",
                certificatePassType : "",
                certificateDate : "",
                certificateScore : "",
                certificateGrade : "",
            })
        }else{
            resume.certificateList = resume.certificateList.map(certificate => ({...certificate, certificateDate : new Date(certificate.certificateDate)}));
        }

        if(resume.preferred === null){
            resume.preferred = {
                veteran : false,
                disabledWhether : "",
                militaryServiceStatus : "",
                militaryStartYear : "",
                militaryStartMonth : "",
                militaryEndYear : "",
                militaryEndMonth : "",
                mos : "",
                militaryClasses : "",
            };
        }

        if(resume.introductionList.length === 0){
            resume.introductionList.push({
                title : "",
                content : "",
                order : 0,
            })
        }
        
        setFormData(resume)
        toggleSpinnerModal(false);
    }

    const handleTitleInput = () => {
        setOpenTitleInput(!openTitleInput);
    }

    const handleEducationAdditionalModal = e => {
        e.preventDefault();
        setOpenEducationAdditionalModal(!openEducationAdditionalModal);
    }

    const changeFormData = (name,value) => {
        // const {value,name} = e.target;
        if(name === "mobile" || name === "phone"){
            const regex = /[^0-9]/g;
            value = value.replace(regex,"");
        }
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const changeForm = (target,name,value) => {
        console.log(name,value)
        setFormData({
            ...formData,
            [target] : {
                ...formData[target],
                [name] : value
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
            if(educationForm.majorList[0].majorType === ""){
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

    const handelResumeDetail = (e) => {
        e.preventDefault();
        let resumeDetail = JSON.parse(JSON.stringify(formData));

        resumeDetail.educationList = resumeDetail.educationList.filter( education =>  education.educationName !== "" && education.majorList.length > 0 && education.admissionYear !== "" && education.graduatedYear !== "" && education.graduatedType !== "");
        resumeDetail.careerList = resumeDetail.careerList.filter( career => career.careerName !== "" && career.careerRole !== "" && career.careerStart !== "" && career.careerEnd !== "");
        resumeDetail.activityList = resumeDetail.activityList.filter(activity => activity.activityType !== "" && activity.activityPlace !== "" && activity.activityStart !== "" && activity.activityEnd !== "");
        resumeDetail.certificateList = resumeDetail.certificateList.filter(certificate => certificate.certificateName !== "" 
                                                                                          && certificate.certificateDate !== "" 
                                                                                          && (certificate.certificateType !== "language" && certificate.certificateIssuer !== "")
                                                                                          && (certificate.certificateType !== "awards" && certificate.certificatePassType !== "")
                                                                                          && (certificate.certificateType === "language" && certificate.certificateLanguage !== "")
                                                                            );
        resumeDetail.introductionList = resumeDetail.introductionList.filter(introduction => introduction.title !== "" && introduction.content !== "");
        openResumeDetailModal(resumeDetail);
    }

    return (
        <div className="resumeForm">
            <Row>
                <Col md={9}>
                    <Form>
                        <div className="resumeTitle">
                            {
                                openTitleInput ? 
                                <>
                                <input type="text" id="resumeTitle" name="title" value={formData.title} onChange={e => changeFormData("title",e.target.value)} />
                                <button onClick={handleTitleInput}>적용</button>
                                </>
                                :
                                <h5>
                                    {formData.title}
                                    <button onClick={handleTitleInput}><FontAwesomeIcon icon={faEdit}/></button>
                                </h5>
                            }
                        </div>
                        <BasicInfo formData={formData} changeFormData={changeFormData} setFormData={setFormData} toggleSpinnerModal={toggleSpinnerModal}/>
                        <Education formData={formData} handleEducationAdditionalModal = {handleEducationAdditionalModal} removeEducation={removeEducation} modifyEducation={modifyEducation}  modifyEducationForm={modifyEducationForm}/>
                        <Career formData={formData} changeFormData={changeFormData}/>
                        {
                            formData.displayCertificate &&
                            <Certificate formData={formData} changeFormData={changeFormData}/>
                        }
                        {
                            formData.displayActivity &&
                            <Activity formData={formData} changeFormData={changeFormData}/>
                        }
                        {
                            formData.displayPreferred &&
                            <Preferential formData={formData} changeForm={changeForm}/>
                        }
                        {
                            formData.displaySkill &&
                            <Skill formData={formData} changeFormData={changeFormData}/>
                        }
                        {
                            formData.displayIntroduction &&
                            <Introduction formData={formData} changeFormData={changeFormData}/>
                        }
                    </Form>
                </Col>
                <Col md={3}>
                    <ResumeSidebar formData={formData} changeFormData={changeFormData} openSpinnerModal={openSpinnerModal} toggleSpinnerModal={toggleSpinnerModal} history={history} handelResumeDetail={handelResumeDetail}/>
                </Col>
            </Row>
            <EducationAdditionalModal isOpen={openEducationAdditionalModal} toggle={handleEducationAdditionalModal} addEducation={addEducation} modifyEducationForm={modifyEducationForm}/>
        </div>
    )
}

export default ResumeForm;