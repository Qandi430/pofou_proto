
import { faFileDownload, faPhoneAlt,faEnvelope,faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Container, Form, FormGroup, Label,Input,Col,Row,Button} from 'reactstrap';

const Contact = ({designMode,data,toggleTitleConfigModal}) => {
    return(
        <div className={`contact ${designMode ? "designMode" : ""}`}>
            <Container>
                <h3 className={`title`} style={{color : `${data.title.color}`,textAlign:`${data.title.textAlign}`}}>
                    <span dangerouslySetInnerHTML={{__html: data.title.text }}/>
                    {
                        designMode &&
                        <button onClick={() => toggleTitleConfigModal("contact")}>
                            <FontAwesomeIcon icon={faCog}/>
                        </button>
                    }
                </h3>
                <Row>
                    <Col md="6" className="contactList">
                        <ul>
                            <li>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                </div>
                                <a href="mailto:dltmdwo430@gmail.com" rel="noreferrer" target="_blank">dltmdwo430@gmail.com</a>
                            </li>
                            <li>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faPhoneAlt}/>
                                </div>
                                <a href="tel:010-6476-3871">010-6476-3871</a>
                            </li>
                            <li>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faFileDownload}/>
                                </div>
                                이력서 다운로드
                            </li>
                        </ul>
                    </Col>
                    <Col md="6" className="messageForm">
                        <Form>
                            <FormGroup row>
                                <Col md="3">
                                    <Label>이름(기업명)</Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label>연락처</Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label>이메일</Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label>제목</Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label>내용</Label>
                                </Col>
                                <Col md="9">
                                    <Input type="textarea"/>
                                </Col>
                            </FormGroup>
                            <Button block color="success">
                                메세지 남기기
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Contact;