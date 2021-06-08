import React,{useState} from 'react';
import ReactDatePicker from 'react-datepicker';
import { Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row,Button } from 'reactstrap';

const ExperienceAdditionalModal = ({isOpen,toggle,addExperience}) => {

    const [experienceForm, setExperienceForm] = useState({
        experienceName : "",
        experienceInstitution : "",
        experienceStartDate : new Date(),
        experienceEndDate : new Date(),
        experienceContent : "",
    });

    const changeExperienceForm = e => {
        setExperienceForm({
            ...experienceForm,
            [e.target.name]: e.target.value
        })
    }

    const changeExperiencePeriod = (name,value) => {
        setExperienceForm({
            ...experienceForm,
            [name] : value
        })
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size="lg" id="experienceAdditionalModal">
            <ModalHeader>관련활동 및 사회경험 추가</ModalHeader>
            <ModalBody>
                <Row className="experienceName">
                    <Col md={12}>
                        <h6 className="formTitle">활동명</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input type="text" name="experienceName" value={experienceForm.experienceName} onChange={changeExperienceForm} placeholder=""/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="experienceInstitution">
                    <Col md={12}>
                        <h6 className="formTitle">기관/장소</h6>
                    </Col>
                    <Col md={12}>
                        <Input type="text" name="experienceInstitution" value={experienceForm.experienceInstitution} onChange={changeExperienceForm} placeholder=""/>
                    </Col>
                </Row>
                <Row className="experiencePeriod">
                    <Col md={12}>
                        <h6 className="formTitle">활동 기간</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <ReactDatePicker
                                selected={experienceForm.experienceStartDate}
                                selectsStart
                                maxDate={experienceForm.experienceEndDate}
                                dateFormat="yyyy.MM.dd"
                                onChange={date=> changeExperiencePeriod("experienceStartDate",date)}
                            />
                            <label>-</label>
                            <ReactDatePicker
                                selected={experienceForm.experienceEndDate}
                                selectsStart
                                minDate={experienceForm.experienceStartDate}
                                maxDate={new Date()}
                                dateFormat="yyyy.MM.dd"
                                onChange={date=> changeExperiencePeriod("experienceEndDate",date)}                            
                            />    
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="experienceContent">
                    <Col md={12}>
                        <h6 className="formTitle">내용</h6>
                    </Col>
                    <Col md={12}>
                        <Input type="textarea" name="experienceContent" defaultValue={experienceForm.experienceContent} onChange={changeExperienceForm} placeholder=""/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btnCancel" onClick={toggle} color="danger" outline>취소</Button>
                <Button className="btnSubmit" color="success" outline onClick={() => addExperience(experienceForm)}>등록</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ExperienceAdditionalModal;