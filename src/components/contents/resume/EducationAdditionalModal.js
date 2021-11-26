import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{ useEffect, useState} from 'react';
import {Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input,Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';

const EducationAdditionalModal = ({isOpen,toggle,addEducation,modifyEducationForm}) => {

    const [openEduTypeDropdown, setOpenEduTypeDropdown] = useState(false);
    const [openHighSchoolMajor,setOpenHighSchoolMajor] = useState(false);
    const [openGraduatedType, setOpenGraduatedType] = useState(false)

    const [eduForm,setEduForm] = useState({
        educationType : "univercity",
        educationName : "",
        majorList : [
            {
                index : 0,
                degreeType : "Bechelor",
                openDegreeTypeDropdown : false,
                openMajorTypeDropdown : false,
                majorType : "major",
                majorName : "",
            },
        ],
        highScoolMajor : "",
        admissionYear : "",
        graduatedYear : "",
        graduatedType : "",
        educationContent : "",
    });

    useEffect(()=>{
        setOpenEduTypeDropdown(false);
        setOpenHighSchoolMajor(false);
        setOpenGraduatedType(false);
        if(modifyEducationForm !== null){
            setEduForm(modifyEducationForm);
        }else{
            setEduForm({
                educationType : "univercity",
                educationName : "",
                majorList : [
                    {
                        index : 0,
                        degreeType : "Bechelor",
                        openDegreeTypeDropdown : false,
                        openMajorTypeDropdown : false,
                        majorType : "major",
                        majorName : "",
                    },
                ],
                highScoolMajor : "",
                admissionYear : "",
                graduatedYear : "",
                graduatedType : "",
                educationContent : "",
            })
        }
    },[isOpen,modifyEducationForm]);

    const handleDropdown = (type,index) => {
        if(type === "eduType"){
            setOpenEduTypeDropdown(!openEduTypeDropdown);
        }else if(type === "degreeType"){
            setOpenEduTypeDropdown(false);
            setEduForm({
                ...eduForm,
                majorList : eduForm.majorList.map(m => m.index === index ? {...m,openDegreeTypeDropdown:!m.openDegreeTypeDropdown} : m)
            })
            
        }else if(type === "majorType"){
            setOpenEduTypeDropdown(false);
            setEduForm({
                ...eduForm,
                majorList : eduForm.majorList.map(m => m.index === index ? {...m,openMajorTypeDropdown:!m.openMajorTypeDropdown} : m)
            })
        }else if(type === "openHighSchoolMajor"){
            setOpenHighSchoolMajor(!openHighSchoolMajor);
        }else if(type === "openGraduatedType"){
            setOpenGraduatedType(!openGraduatedType);
        }
    }

    const changeEduForm = (name,value,index) => {
        // setEduForm({
        //     ...eduForm,
        //     [name]:value
        // });
        if(name === "admissionYear" || name === "graduatedYear"){
            const regex = /[^0-9]/g;
            value = value.replace(regex,"");
        }
        
        setEduForm(() => {
            if(name === "degreeType" || name === "majorType" || name === "majorName"){
                let major = eduForm.majorList.find(m => m.index === index );
                major[name] = value;
                return {
                    ...eduForm,
                    majorList : eduForm.majorList.map(m => m.index === major.index ? major: m)
                }   
            }
            
            return {
                ...eduForm,
                [name]:value,
                majorList : name === "educationType" ? [{index : 0,degreeType : value === "highSchool" ? "" : "Associate",majorType : value === "highSchool" ? "" : "major",majorName : "",openDegreeTypeDropdown : false,openMajorTypeDropdown : false,}]: eduForm.majorList
            }
        })
    }

    const convertValueToName = (type,index) => {
        
        if(type === "educationType"){
            switch(eduForm.educationType){
                case "highSchool":
                    return "고등학교";
                case "univercity":
                    return "대학교"
                default:
                    return "학사";
            }
        }else if(type === "degreeType"){
            switch(eduForm.majorList.find(m => m.index === index ).degreeType){
                case "Bechelor":
                    return "학사";
                case "Associate":
                    return "전문학사";
                case "Master":
                    return "석사";
                case "Doctor":
                    return "박사";
                case "Certification":
                    return "수료";
                default :
                    return "";
            }
        }else if(type === "majorType"){
            switch(eduForm.majorList.find(m => m.index === index ).majorType){
                case "major":
                    return "전공";
                case "double":
                    return "복수전공";
                case "minor":
                    return  "부전공";
                case "linked":
                    return "연합전공";
                case "course":
                    return "코스";
                case "NatudalSciences":
                    return "이과";
                case "LiberalArts":
                    return "문과";
                case "Meister":
                    return "전문(실업)";
                case "ArtsAndPhysical":
                    return "예체능";
                default:
                    return "선택";
            }
        }else if(type === "highScoolMajor"){
            switch(eduForm.highScoolMajor){
                case "NatudalSciences":
                    return "이과";
                case "LiberalArts":
                    return "문과";
                case "Meister":
                    return "전문(실업)";
                case "ArtsAndPhysical":
                    return "예체능";
                default:
                    return "선택";
            }
        }else if(type === "graduatedType"){
            switch(eduForm.graduatedType){
                case "graduate":
                    return "졸업";
                case "enrollment":
                    return "재학";
                case "semesterOff":
                    return "휴학";
                case "dropOut":
                    return "중퇴";
                default :
                    return "선택";
            }
        }
    }

    const addNewMajor = () => {
        const newMajor = {
            index : eduForm.majorList.length,
            degreeType : "Bechelor",
            majorType : "major",
            majorName : "",
            openDegreeTypeDropdown : false,
            openEduTypeDropdown : false,
        }

        setEduForm({
            ...eduForm,
            majorList : eduForm.majorList.concat(newMajor)  
        })
    }

    const removeMajor = index => {
        setEduForm({
            ...eduForm,
            majorList : eduForm.majorList.filter(major => major.index !== index)
        })
    }

    return (
        <Modal isOpen={isOpen} size="lg" toggle={toggle} centered id="educationAdditionalModal">
            <ModalHeader>
                학력 추가
            </ModalHeader>
            <ModalBody>
                <Row className="eduBasic">
                    <Col md={12}>
                        <h6 className="formTitle">학력</h6>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label htmlFor="educationType">학교구분</Label>
                            <Dropdown isOpen={openEduTypeDropdown} toggle={() => handleDropdown("eduType")}>
                                <DropdownToggle caret>
                                    {convertValueToName("educationType")}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeEduForm("educationType","highSchool")}>고등학교</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("educationType","univercity")}>대학교</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                    <Col md={9} className="withIcon">
                        <FormGroup>
                            <Label>학교</Label>
                            <FontAwesomeIcon icon={faSearch}/>
                            <Input type="text" name="educationName" value={eduForm.educationName} onChange={e => changeEduForm("educationName",e.target.value)} placeholder="예 : 서울대학교"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="majorInfo">
                    <Col md={12}>
                        <h6 className="formTitle">
                            {
                                eduForm.educationType === "univercity" ?
                                <>
                                    전공
                                    <p>• 학위가 여러 개인 경우, 별도 학력으로 입력해 주세요.</p>
                                </>
                                : "전공계열"
                            }
                            
                        </h6>
                    </Col>
                    {
                        eduForm.educationType === "univercity" ?
                            <ul className="majorList">
                                {        
                                    eduForm.majorList.map(
                                        major => 
                                        <li key={major.index} className="row">
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Dropdown isOpen={major.openDegreeTypeDropdown} toggle={() => handleDropdown("degreeType",major.index)}>
                                                        <DropdownToggle caret>
                                                            {convertValueToName("degreeType",major.index)}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Bechelor",major.index)}>학사</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Associate",major.index)}>전문학사</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Master",major.index)}>석사</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Doctor",major.index)}>박사</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Certification",major.index)}>수료</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Dropdown isOpen={major.openMajorTypeDropdown} toggle={() => handleDropdown("majorType",major.index)}>
                                                        <DropdownToggle caret>
                                                            {convertValueToName("majorType",major.index)}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","major",major.index)}>전공</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","double",major.index)}>복수전공</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","minor",major.index)}>부전공</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","linked",major.index)}>연합전공</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","cource",major.index)}>코스</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                            <Col md={major.index === 0 ? 6 : 5} className="withIcon">
                                                <FontAwesomeIcon icon={faSearch}/>
                                                <Input type="text" name="majorName" value={major.majorName} onChange={e => changeEduForm("majorName",e.target.value,major.index)} placeholder="예 : 컴퓨터공학부"/>
                                            </Col>
                                            {
                                                major.index > 0 &&
                                                <Col md={1}>
                                                    <button className="btnRemoveMajor" onClick={() => removeMajor(major.index)}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </button>
                                                </Col>
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                            :
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={openHighSchoolMajor} toggle={() => handleDropdown("openHighSchoolMajor")}>
                                        <DropdownToggle caret>
                                            {convertValueToName("majorType",0)}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => changeEduForm("majorType","NatudalSciences",0)}>이과</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","LiberalArts",0)}>문과</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","Meister",0)}>전문(실업)</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","ArtsAndPhysical",0)}>예체능</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                    }
                    {
                        eduForm.educationType === "univercity" &&
                        <Col>
                            <button className="btnAddMajor" onClick={addNewMajor}><FontAwesomeIcon icon={faPlus}/> 전공추가</button>
                        </Col>
                    }
                </Row>
                <Row className="educationPeriod">
                    <Col md={12}>
                        <h6 className="formTitle">
                            재학 기간
                        </h6>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="admissionYear" onChange={e => changeEduForm("admissionYear",e.target.value)} value={eduForm.admissionYear} placeholder="입학년도"/>
                            <span>-</span>
                            <Input type="text" name="graduatedYear"  onChange={e => changeEduForm("graduatedYear",e.target.value)} value={eduForm.graduatedYear} placeholder="졸업년도"/>
                            <Dropdown isOpen={openGraduatedType} toggle={() => handleDropdown("openGraduatedType")}>
                                <DropdownToggle caret>
                                    {convertValueToName("graduatedType")}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","graduate")}>졸업</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","enrollment")}>재학</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","semesterOff")}>휴학</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","dropOut")}>중퇴</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="educationContent">
                    <Col md={12}>
                        <h6 className="formTitle">간단 설명</h6>
                    </Col>
                    <Col md={12}>
                        <Input type="textarea" name="educationContent" onChange={e => changeEduForm("educationContent",e.target.value)}  defaultValue={eduForm.educationContent} />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btnCancel" onClick={toggle} color="danger" outline>취소</Button>
                <Button className="btnSubmit" color="success" outline onClick={() => addEducation(eduForm)}>등록</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EducationAdditionalModal;