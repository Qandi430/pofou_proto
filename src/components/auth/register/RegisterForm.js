import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';

const RegisterForm = () => {
    return (
        <Form className="registerForm">
            <FormGroup>
                <input type="email" name="registerEmail"/>
                <Label>이메일 주소</Label>
                <span className="line"></span>
            </FormGroup>
            <FormGroup>
                <input type="password" name="registerPassword"/>
                <Label>비밀번호 등록</Label>
                <span className="line"></span>
            </FormGroup>
            <FormGroup>
                <input type="password" name="registerPasswordConfirm"/>
                <Label>비밀번호 확인</Label>
                <span className="line"></span>
            </FormGroup>
            <div className="agreeBox">
                <FormGroup>
                    <input type="checkbox" name="registerAgreement" id="registerAgreement" />
                    <label htmlFor="registerAgreement">
                        <span className="dummyCheck"><FontAwesomeIcon icon={faCheck}/></span>
                        포포유 가입약관에 모두 동의합니다.
                    </label>
                    <button className="btnRegisterModal">확인하기</button>
                </FormGroup>
                <p>
                    스터닝 이용약관(필수), 개인정보취급방침(필수), 마케팅정보 수집동의(선택)
                </p>
            </div>
            <Button>다음으로</Button>
        </Form>
    )
}

export default RegisterForm;