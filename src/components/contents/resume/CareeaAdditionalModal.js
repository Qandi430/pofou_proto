import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{useState,useEffect} from 'react';
import { Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row,Input,Button, DropdownToggle, DropdownMenu, DropdownItem,Dropdown } from 'reactstrap';

const CareerAdditiaonalModal = ({isOpen,toggle,modifyCareerForm,addCareer}) => {

    const [careerForm, setCareerForm] = useState({
        careerName : "",
        careerRole : "",
        careerStartYear : "",
        careerStartMonth : "",
        careerEndYear : "",
        careerEndMonth : "",
        careerPeriodType : "workOff",
        careerContent : "",
    });
    const [openStartMonth,setOpenStartMonth] = useState(false);
    const [openEndMonth,setOpenEndMonth] = useState(false);

    useEffect(()=>{
        setOpenStartMonth(false);
        setOpenEndMonth(false);
        
        if(modifyCareerForm !== null){
            setCareerForm(modifyCareerForm);
        }else{
            setCareerForm({
                careerName : "",
                careerRole : "",
                careerStartYear : "",
                careerStartMonth : "",
                careerEndYear : "",
                careerEndMonth : "",
                careerPeriodType : "workOff",
                careerContent : "",
            })
        }
    },[isOpen,modifyCareerForm]);

    const changeCareerForm = e => {
        if(e.target.name === "careerPeriodType"){
            
            setCareerForm({
                ...careerForm,
                careerPeriodType : e.target.checked ? "workOn" :"workOff",
            })
        }else{
            setCareerForm({
                ...careerForm,
                [e.target.name] : e.target.value
            });
        }
    }

    const handleStartMonth = () => {
        setOpenStartMonth(!openStartMonth);
    }
    
    const handleEndMonth = () => {
        setOpenEndMonth(!openEndMonth);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg" id="careerAdditionalModal">
            <ModalHeader>경력 추가</ModalHeader>
            <ModalBody>
                <Row className="withIcon">
                    <Col md={12}>
                        <h6 className="formTitle">기업명</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <FontAwesomeIcon icon={faSearch}/>
                            <Input type="text" name="careerName" value={careerForm.careerName} onChange={changeCareerForm} placeholder="예 : 포포유"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="withIcon">
                    <Col md={12}>
                        <h6 className="formTitle">역할</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <FontAwesomeIcon icon={faSearch}/>
                            <Input type="text" name="careerRole" value={careerForm.careerRole} onChange={changeCareerForm} placeholder="예 : UI디자이너, 프론트엔드 개발자"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{alignItems:"center"}}>
                    <Col md={12}>
                        <h6 className="formTitle">재직 기간</h6>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input type="text" name="careerStartYear" value={careerForm.careerStartYear} onChange={changeCareerForm} placeholder="입사년도"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Dropdown isOpen={openStartMonth} toggle={handleStartMonth}>
                                <DropdownToggle caret>
                                    {careerForm.careerStartMonth ===  "" ? "---" : careerForm.careerStartMonth}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="careerStartMonth" value="1" onClick={changeCareerForm}>1</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="2" onClick={changeCareerForm}>2</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="3" onClick={changeCareerForm}>3</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="4" onClick={changeCareerForm}>4</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="5" onClick={changeCareerForm}>5</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="6" onClick={changeCareerForm}>6</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="7" onClick={changeCareerForm}>7</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="8" onClick={changeCareerForm}>8</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="9" onClick={changeCareerForm}>9</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="10" onClick={changeCareerForm}>10</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="11" onClick={changeCareerForm}>11</DropdownItem>
                                    <DropdownItem name="careerStartMonth" value="12" onClick={changeCareerForm}>12</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                    <Col md={"auto"}>
                        <Label>-</Label>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Input type="text" name="careerEndYear" value={careerForm.careerEndYear} onChange={changeCareerForm} placeholder="퇴사년도"/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Dropdown isOpen={openEndMonth} toggle={handleEndMonth}>
                                <DropdownToggle caret>
                                    {careerForm.careerEndMonth ===  "" ? "---" : careerForm.careerEndMonth}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="careerEndMonth" value="1" onClick={changeCareerForm}>1</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="2" onClick={changeCareerForm}>2</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="3" onClick={changeCareerForm}>3</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="4" onClick={changeCareerForm}>4</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="5" onClick={changeCareerForm}>5</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="6" onClick={changeCareerForm}>6</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="7" onClick={changeCareerForm}>7</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="8" onClick={changeCareerForm}>8</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="9" onClick={changeCareerForm}>9</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="10" onClick={changeCareerForm}>10</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="11" onClick={changeCareerForm}>11</DropdownItem>
                                    <DropdownItem name="careerEndMonth" value="12" onClick={changeCareerForm}>12</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup style={{display:"flex",alignItems:"center"}}>
                            <Input type="checkbox" name="careerPeriodType" onChange={changeCareerForm} checked={careerForm.careerPeriodType === "workOn"}/>
                            <Label style={{marginBottom:"0",marginLeft:"0.5em"}}>재직중</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h6 className="formTitle">간단설명</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input type="textarea" name="careerContent" defaultValue={careerForm.careerContent} onChange={changeCareerForm}/>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btnCancel" onClick={toggle} color="danger" outline>취소</Button>
                <Button className="btnSubmit" color="success" onClick={() => addCareer(careerForm)}>등록</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CareerAdditiaonalModal;