import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { insertResume, updateResume } from '../../../server/resume/ResumeServer'

const ResumeSidebar = ({formData,changeFormData,toggleSpinnerModal,history,handelResumeDetail}) => {
    const moveToTarget = (target) => {
        let time = 0;
        
        if(target === "certificate" && !formData.displayCertificate){
            changeFormData("displayCertificate",!formData["displayCertificate"]);
            time = 500;
        }
        if(target === "activity" && !formData.displayActivity){
            changeFormData("displayActivity",!formData["displayActivity"]);
            time = 500;
        }
        if(target === "preferred" && !formData.displayPreferred){
            changeFormData("displayPreferred",!formData["displayPreferred"]);
            time = 500;
        }
        if(target === "skill" && !formData.displayActivity){
            changeFormData("displaySkill",!formData["displaySkill"]);
            time = 500;
        }
        if(target === "introduction" && !formData.displayIntroduction){
            changeFormData("displayIntroduction",!formData["displayIntroduction"]);
            time = 500;
        }
        setTimeout(() => {
            window.scrollTo({top:document.querySelector(`.${target}`).offsetTop, behavior:"smooth"});
        },time);
        
    }

    const toggleDisplay = (e,name) => {
        e.preventDefault();
        changeFormData(name,!formData[name]);
    }

    const saveResume = async (e,complete) => {
        e.preventDefault();
        if(formData.name === ""){
            alert("기본정보의 이름은 필수사항 입니다.");
            moveToTarget("basicInfo");
            return false;
        }
        if(formData.mobile === ""){
            alert("기본정보의 휴대폰 번호는 필수사항 입니다.");
            moveToTarget("basicInfo");
            return false;
        }
        if(formData.email === ""){
            alert("기본정보의 이메일은 필수사항 입니다.");
            moveToTarget("basicInfo");
            return false;
        }
        
        if(formData.educationList.length < 1){
            alert("한개 이상의 학력을 입력해 주세요.");
            moveToTarget("education");
            return false;
        }
        if(formData.careerType === ""){
            alert("신입/경력을 선택해 주세요.");
            moveToTarget("career");
            return false;
        }else if(formData.careerType === "experienced"){
            if(formData.careerList.length < 1){
                alert("한개 이상의 경력을 입력해 주세요.");
                moveToTarget("career");
                return false;
            }else{
                for(let i = 0; i<formData.careerList.length; i++){
                    if(formData.careerList[i].careerName === ""){
                        alert("기업명을 입력해 주세요.");
                        moveToTarget("career");
                        return false;
                    }
                    if(formData.careerList[i].careerRole === ""){
                        alert("역할을 입력해 주세요.");
                        moveToTarget("career");
                        return false;
                    }
                    if(formData.careerList[i].careerStart === ""){
                        alert("재직 시작일을 입력해 주세요.");
                        moveToTarget("career");
                        return false;
                    }
                    if(formData.careerList[i].careerEnd === ""){
                        alert("재직 종료일을 입력해 주세요.");
                        moveToTarget("career");
                        return false;
                    }
                }
            }
        }
        if(formData.displayCertificate){
            for(let i = 0; i<formData.certificateList.length; i++){
                if(formData.certificateList[i].certificateType === "license"){
                    if(formData.certificateList[i].certificateName === ""){
                        alert("자격증명을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateIssuer === ""){
                        alert("발행처/기관을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificatePassType === ""){
                        alert("합격 구분을 선택해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateDate === ""){
                        alert("취득일을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                }else if(formData.certificateList[i].certificateType === "language"){
                    if(formData.certificateList[i].certificateLanguage === ""){
                        alert("언어를 선택해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateName === ""){
                        alert("시험종류를 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificatePassType === ""){
                        alert("취득 여뷰를 선택해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateDate === ""){
                        alert("취득일을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                }else{
                    if(formData.certificateList[i].certificateName === ""){
                        alert("수상명/공모전 이름을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateIssuer === ""){
                        alert("수여기관을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                    if(formData.certificateList[i].certificateDate === ""){
                        alert("수상/공모일을 입력해 주세요.");
                        moveToTarget("certificate");
                        return false;
                    }
                }
            }
        }
        if(formData.displayActivity){
            for(let i = 0; i<formData.activityList.length; i++){
                if(formData.activityList[i].activityType === ""){
                    alert("활동구분을 선택해 주세요.");                    
                    moveToTarget("activity");
                    return false;
                }
                if(formData.activityList[i].activityPlace === ""){
                    alert("기관/장소를 입력해 주세요.");
                    moveToTarget("activity");
                    return false;
                }
                if(formData.activityList[i].activityStart === "" || formData.activityList[i].activityEnd === ""){
                    alert("활동 기간을 입력해 주세요.");
                    moveToTarget("activity");
                    return false;
                }
                
            }
        }
        if(formData.displayIntroduction){
            for(let i = 0; i<formData.introductionList.length; i++){
                if(formData.introductionList[i].title === ""){
                    alert("제목을 입력해 주세요.");
                    moveToTarget("introduction");
                    return false;
                }
                if(formData.introductionList[i].content === ""){
                    alert("내용을 입력해 주세요.");
                    moveToTarget("introduction");
                    return false;
                }
            }
        }
        formData.complete = complete;
        toggleSpinnerModal(true);
        if(formData.resumeNumber === undefined || formData.resumeNumber === ""){
            const {data : insertResult} = await insertResume(formData);
            if(insertResult){
                alert("이력서가 등록되었습니다.");
                history.push(`/resume/list`);
            }else{
                alert("이력서 등록에 실패하였습니다.");
            }
        }else{
            const {data : updateResult} = await updateResume(formData);
            if(updateResult){
                alert("이력서가 수정되었습니다.");
                history.push(`/resume/list`);
            }else{
                alert("이력서 수정에 실패하였습니다.");
            }
        }
        toggleSpinnerModal(false);    
    }

    return (
        <aside className="resumeSidebar">
            <h5 className="title">이력서 항목</h5>
            <ul className="resumeList">
                <li>
                    <h6 className="listName" onClick={() => moveToTarget("basicInfo")}>기본정보 <span>필수</span></h6>
                </li>
                <li>
                    <h6 className="listName" onClick={() => moveToTarget("education")}>학력사항 <span>필수</span></h6>
                </li>
                <li>
                    <h6 className="listName" onClick={() => moveToTarget("career")}>경력사항 <span>필수</span></h6>
                </li>
                <li className={`${formData.displayCertificate ? "on" : ""}`}>
                    <h6 className="listName" onClick={() => moveToTarget("certificate")}>자격증/어학/수상 내역</h6>
                    {
                        formData.displayCertificate ? <button className="btnExcept" onClick={e=>toggleDisplay(e,"displayCertificate")}>제외 <FontAwesomeIcon icon={faTimes}/></button>:<button className="btnAdd" onClick={e=>toggleDisplay(e,"displayCertificate")}>추가 <FontAwesomeIcon icon={faPlus}/></button> 
                    }
                </li>
                <li className={`${formData.displayActivity ? "on" : ""}`}>
                    <h6 className="listName" onClick={() => moveToTarget("activity")}>대외활동</h6>
                    {
                        formData.displayActivity ? <button className="btnExcept" onClick={e=>toggleDisplay(e,"displayActivity")}>제외 <FontAwesomeIcon icon={faTimes}/></button>:<button className="btnAdd" onClick={e=>toggleDisplay(e,"displayActivity")}>추가 <FontAwesomeIcon icon={faPlus}/></button> 
                    }
                </li>
                <li className={`${formData.displayPreferred ? "on" : ""}`}>
                    <h6 className="listName" onClick={() => moveToTarget("preferred")}>취업 우대사항</h6>
                    {
                        formData.displayPreferred ? <button className="btnExcept" onClick={e=>toggleDisplay(e,"displayPreferred")}>제외 <FontAwesomeIcon icon={faTimes}/></button>:<button className="btnAdd" onClick={e=>toggleDisplay(e,"displayPreferred")}>추가 <FontAwesomeIcon icon={faPlus}/></button> 
                    }
                </li>
                <li className={`${formData.displaySkill ? "on" : ""}`}>
                    <h6 className="listName" onClick={() => moveToTarget("skill")}>보유기술 및 능력</h6>
                    {
                        formData.displaySkill ? <button className="btnExcept" onClick={e=>toggleDisplay(e,"displaySkill")}>제외 <FontAwesomeIcon icon={faTimes}/></button>:<button className="btnAdd" onClick={e=>toggleDisplay(e,"displaySkill")}>추가 <FontAwesomeIcon icon={faPlus}/></button> 
                    }
                </li>
                <li className={`${formData.displayIntroduction ? "on" : ""}`}>
                    <h6 className="listName" onClick={() => moveToTarget("introduction")}>자기소개서</h6>
                    {
                        formData.displayIntroduction ? <button className="btnExcept" onClick={e=>toggleDisplay(e,"displayIntroduction")}>제외 <FontAwesomeIcon icon={faTimes}/></button>:<button className="btnAdd" onClick={e=>toggleDisplay(e,"displayIntroduction")}>추가 <FontAwesomeIcon icon={faPlus}/></button> 
                    }
                </li>
            </ul>
            <div className="btnBox">
                <button className="btnPreview" onClick={handelResumeDetail}>미리보기</button>
                <button className="btnTemporary" onClick={ e => saveResume(e,false)}>중간저장</button>
                <button className="btnSave" onClick={ e => saveResume(e,true)}>{formData.resumeNumber === undefined  || formData.resumeNumber === "" || !formData.complete ? "이력서 저장" : "이력서 수정"}</button>
            </div>
        </aside>
    )
}

export default ResumeSidebar;
