import React,{useState} from 'react';

import {Modal,ModalHeader,ModalBody,ModalFooter,Row,Col,FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button} from 'reactstrap';

const AwardsAdditionalModal = ({isOpen,toggle,addAwards,}) => {
    const [awardsForm,setAwardsForm] = useState({
        awardsName : "",
        awardsPrize : "",
        awardsAgency : "",
        awardsYear : "",
        awardsMonth : "",
        awardsContent:  "",
    });
    const [openAwardsMonth,setOpenAwardsMonth] = useState(false);

    const changeAwardsForm = e => {
        setAwardsForm({
            ...awardsForm,
            [e.target.name] : e.target.value
        })
    }

    const handleAwardsMonth = () => {
        setOpenAwardsMonth(!openAwardsMonth);
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} size="lg" centered id="awardsAdditionalModal">
            <ModalHeader>
                수상 내역 추가
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={12}>
                        <h6 className="formTitle">수상부분</h6>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="awardsName" value={awardsForm.awardsName} onChange={changeAwardsForm} placeholder="예 : 불어말하기 대회"/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="awardsPrize" value={awardsForm.awardsPrize} onChange={changeAwardsForm} placeholder="예 : 대상"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h6 className="formTitle">수상기관</h6>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input type="text" name="awardsAgency" value={awardsForm.awardsAgency} onChange={changeAwardsForm} placeholder="수상기관"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h6 className="formTitle">수상일</h6>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Input type="text" name="awardsYear" value={awardsForm.awardsYear} onChange={changeAwardsForm} placeholder="수상년도"/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Dropdown isOpen={openAwardsMonth} toggle={handleAwardsMonth}>
                                <DropdownToggle caret>{awardsForm.awardsMonth === "" ? "---" : awardsForm.awardsMonth}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem name="awardsMonth" value="1" onClick={changeAwardsForm}>1</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="2" onClick={changeAwardsForm}>2</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="3" onClick={changeAwardsForm}>3</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="4" onClick={changeAwardsForm}>5</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="5" onClick={changeAwardsForm}>4</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="6" onClick={changeAwardsForm}>6</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="7" onClick={changeAwardsForm}>7</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="8" onClick={changeAwardsForm}>8</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="9" onClick={changeAwardsForm}>9</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="10" onClick={changeAwardsForm}>10</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="11" onClick={changeAwardsForm}>11</DropdownItem>
                                    <DropdownItem name="awardsMonth" value="12" onClick={changeAwardsForm}>12</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h6 className="formTitle">간단 설명</h6>
                    </Col>
                    <Col md={12}>
                        <Input type="textarea" name="awardsContent" defaultValue={awardsForm.awardsContent} onChange={changeAwardsForm}/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="btnCancel" onClick={toggle} color="danger" outline>취소</Button>
                <Button className="btnSubmit" color="success" outline onClick={() => addAwards(awardsForm)}>등록</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AwardsAdditionalModal;