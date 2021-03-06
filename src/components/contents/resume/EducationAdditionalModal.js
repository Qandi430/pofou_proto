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
                    return "????????????";
                case "univercity":
                    return "?????????"
                default:
                    return "??????";
            }
        }else if(type === "degreeType"){
            switch(eduForm.majorList.find(m => m.index === index ).degreeType){
                case "Bechelor":
                    return "??????";
                case "Associate":
                    return "????????????";
                case "Master":
                    return "??????";
                case "Doctor":
                    return "??????";
                case "Certification":
                    return "??????";
                default :
                    return "";
            }
        }else if(type === "majorType"){
            switch(eduForm.majorList.find(m => m.index === index ).majorType){
                case "major":
                    return "??????";
                case "double":
                    return "????????????";
                case "minor":
                    return  "?????????";
                case "linked":
                    return "????????????";
                case "course":
                    return "??????";
                case "NatudalSciences":
                    return "??????";
                case "LiberalArts":
                    return "??????";
                case "Meister":
                    return "??????(??????)";
                case "ArtsAndPhysical":
                    return "?????????";
                default:
                    return "??????";
            }
        }else if(type === "highScoolMajor"){
            switch(eduForm.highScoolMajor){
                case "NatudalSciences":
                    return "??????";
                case "LiberalArts":
                    return "??????";
                case "Meister":
                    return "??????(??????)";
                case "ArtsAndPhysical":
                    return "?????????";
                default:
                    return "??????";
            }
        }else if(type === "graduatedType"){
            switch(eduForm.graduatedType){
                case "graduate":
                    return "??????";
                case "enrollment":
                    return "??????";
                case "semesterOff":
                    return "??????";
                case "dropOut":
                    return "??????";
                default :
                    return "??????";
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
                ?????? ??????
            </ModalHeader>
            <ModalBody>
                <Row className="eduBasic">
                    <Col md={12}>
                        <h6 className="formTitle">??????</h6>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label htmlFor="educationType">????????????</Label>
                            <Dropdown isOpen={openEduTypeDropdown} toggle={() => handleDropdown("eduType")}>
                                <DropdownToggle caret>
                                    {convertValueToName("educationType")}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeEduForm("educationType","highSchool")}>????????????</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("educationType","univercity")}>?????????</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                    <Col md={9} className="withIcon">
                        <FormGroup>
                            <Label>??????</Label>
                            <FontAwesomeIcon icon={faSearch}/>
                            <Input type="text" name="educationName" value={eduForm.educationName} onChange={e => changeEduForm("educationName",e.target.value)} placeholder="??? : ???????????????"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="majorInfo">
                    <Col md={12}>
                        <h6 className="formTitle">
                            {
                                eduForm.educationType === "univercity" ?
                                <>
                                    ??????
                                    <p>??? ????????? ?????? ?????? ??????, ?????? ???????????? ????????? ?????????.</p>
                                </>
                                : "????????????"
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
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Bechelor",major.index)}>??????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Associate",major.index)}>????????????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Master",major.index)}>??????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Doctor",major.index)}>??????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("degreeType","Certification",major.index)}>??????</DropdownItem>
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
                                                            <DropdownItem onClick={() => changeEduForm("majorType","major",major.index)}>??????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","double",major.index)}>????????????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","minor",major.index)}>?????????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","linked",major.index)}>????????????</DropdownItem>
                                                            <DropdownItem onClick={() => changeEduForm("majorType","cource",major.index)}>??????</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                            <Col md={major.index === 0 ? 6 : 5} className="withIcon">
                                                <FontAwesomeIcon icon={faSearch}/>
                                                <Input type="text" name="majorName" value={major.majorName} onChange={e => changeEduForm("majorName",e.target.value,major.index)} placeholder="??? : ??????????????????"/>
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
                                            <DropdownItem onClick={() => changeEduForm("majorType","NatudalSciences",0)}>??????</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","LiberalArts",0)}>??????</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","Meister",0)}>??????(??????)</DropdownItem>
                                            <DropdownItem onClick={() => changeEduForm("majorType","ArtsAndPhysical",0)}>?????????</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                    }
                    {
                        eduForm.educationType === "univercity" &&
                        <Col>
                            <button className="btnAddMajor" onClick={addNewMajor}><FontAwesomeIcon icon={faPlus}/> ????????????</button>
                        </Col>
                    }
                </Row>
                <Row className="educationPeriod">
                    <Col md={12}>
                        <h6 className="formTitle">
                            ?????? ??????
                        </h6>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="admissionYear" onChange={e => changeEduForm("admissionYear",e.target.value)} value={eduForm.admissionYear} placeholder="????????????"/>
                            <span>-</span>
                            <Input type="text" name="graduatedYear"  onChange={e => changeEduForm("graduatedYear",e.target.value)} value={eduForm.graduatedYear} placeholder="????????????"/>
                            <Dropdown isOpen={openGraduatedType} toggle={() => handleDropdown("openGraduatedType")}>
                                <DropdownToggle caret>
                                    {convertValueToName("graduatedType")}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","graduate")}>??????</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","enrollment")}>??????</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","semesterOff")}>??????</DropdownItem>
                                    <DropdownItem onClick={() => changeEduForm("graduatedType","dropOut")}>??????</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="educationContent">
                    <Col md={12}>
                        <h6 className="formTitle">?????? ??????</h6>
                    </Col>
                    <Col md={12}>
                        <Input type="textarea" name="educationContent" onChange={e => changeEduForm("educationContent",e.target.value)}  defaultValue={eduForm.educationContent} />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btnCancel" onClick={toggle} color="danger" outline>??????</Button>
                <Button className="btnSubmit" color="success" outline onClick={() => addEducation(eduForm)}>??????</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EducationAdditionalModal;