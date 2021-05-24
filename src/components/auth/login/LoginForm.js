import React from 'react';
import { Form, FormGroup, Label,Button } from 'reactstrap';

const LoginForm = () => {
    return (
        <Form className="loginForm">
            <FormGroup>
                <input type="email" name="loginEmail"/>
                
                <Label>이메일 아이디</Label>
                <div className="line"></div>
            </FormGroup>
            <FormGroup>
                <input type="password" name="loginPassword"/>
                <Label>패스워드</Label>
                <div className="line"></div>
            </FormGroup>
            <Button>로그인</Button>
        </Form>
    )
}

export default LoginForm;