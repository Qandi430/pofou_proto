import React from 'react';
import {Form, FormGroup, Col, Label, Input, Button} from 'reactstrap';

const BasicContactForm = ({grid}) => {
    return (
        <div className={`contact basicContactForm grid${grid}`}>
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
        </div>
    )
}  

export default BasicContactForm;