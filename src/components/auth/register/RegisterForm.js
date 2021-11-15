import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';

const RegisterForm = ({registrationForm,changeRegisterForm,handleEmailAuthentication,timerMinutes,timerSeconds,handleCheckAuthNumber,submitRegistForm}) => {
    return (
        <Form className="registerForm" onSubmit={submitRegistForm}>
            <FormGroup>
                <input id="registerEmail" type="email" className={`${registrationForm.email === "" ? "" :"focus"}`} name="registerEmail" value={registrationForm.email} onChange={e => changeRegisterForm("email",e.target.value)}/>
                <Label htmlFor="registerEmail">이메일 주소</Label>
                <span className="line"></span>
                <button className={`btnEmailAuth ${registrationForm.email === "" || registrationForm.emailAuth === "collect" ? "" :"on"}` } onClick={e=> handleEmailAuthentication(e)}>{registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "unCollect" ? "재전송" : "인증"}</button>
                <p className={`${registrationForm.emailAuth !== "" && registrationForm.emailAuth !== "collect" ? "on" : ""}`}  style={{color: `${registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "collect" || registrationForm.emailAuth === "unCollect" ? "#16afb0" : "#ed2727"}`}}>
                    {
                        registrationForm.emailAuth === "invalid" ? "이메일 형식을 올바르게 입력해주세요." 
                            : registrationForm.emailAuth === "duplicate" ? "이미 가입된 계정입니다. 해당 계정으로 로그인하시거나 다른 이메일로 회원가입을 진행해주세요."
                                : registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "collect" || registrationForm.emailAuth === "unCollect" ? "인증 번호가 발송되었습니다. 메일에 포함된 인증번호 6자리를 입력하세요." 
                                    : ""
                    }
                </p>
            </FormGroup>
            <FormGroup style={{display:`${registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "collect" || registrationForm.emailAuth === "unCollect" ? "block" : "none"}`}}>
                <input id="registerEmailAuth" type="text" className={`${registrationForm.emailAuthNumber === "" ? "" : "focus"}`} name="emailAuthNumber"  onChange={e => changeRegisterForm("emailAuthNumber",e.target.value)}/>
                <Label htmlFor="registerEmailAuth">인증번호 입력</Label>
                <span className="line"></span>
                <div className="btnBox" style={{display:`${registrationForm.emailAuth !== "collect" ? "flex": "none"}`}}>
                    <div className="timer">{timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</div>
                    <button className="btnAuthNumber" onClick={e=>handleCheckAuthNumber(e)}>인증확인</button>
                </div>
                <p style={{display:`${registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "collect" || registrationForm.emailAuth === "unCollect" ? "block" : "none"}`,color:`${registrationForm.emailAuth === "collect"?"#16afb0" : "#ed2727"}`}}>
                    {
                        registrationForm.emailAuth === "collect" ? "본인 인증이 완료되었습니다."
                            : timerMinutes === 0 && timerSeconds=== 0 ? "입력시간이 초과되었습니다. 재전송 버튼을 눌러주세요."
                                : registrationForm.emailAuth === "unCollect" ? "인증번호가 일치하지 않습니다."
                                    : ""
                    }
                </p>
            </FormGroup>
            <FormGroup>
                <input id="registerPassword" type="password" className={`${registrationForm.password === "" ? "" :"focus"}`} name="registerPassword" value={registrationForm.password} onChange={e => changeRegisterForm("password",e.target.value)}/>
                <Label htmlFor="registerPassword">비밀번호 등록</Label>
                <span className="line"></span>
            </FormGroup>
            <FormGroup>
                <input id="registerPasswordConfirm" type="password" className={`${registrationForm.passwordConfirm === "" ? "" :"focus"}`} name="registerPasswordConfirm" value={registrationForm.passwordConfirm} onChange={e => changeRegisterForm("passwordConfirm",e.target.value)}/>
                <Label htmlFor="registerPasswordConfirm">비밀번호 확인</Label>
                <span className="line"></span>
            </FormGroup>
            <div className="agreeBox">
                <FormGroup>
                    <input type="checkbox" name="registerAgreement" id="registerAgreement" checked={registrationForm.registerAgreement} onChange={e => changeRegisterForm("registerAgreement",e.target.checked)}/>
                    <label htmlFor="registerAgreement">
                        <span className="dummyCheck"><FontAwesomeIcon icon={faCheck}/></span>
                        포포유 가입약관에 모두 동의합니다.
                    </label>
                    <button type="button" className="btnRegisterModal">확인하기</button>
                </FormGroup>
                <p>
                    포포유 이용약관(필수), 개인정보취급방침(필수), 마케팅정보 수집동의(선택)
                </p>
            </div>
            <Button>회원가입</Button>
        </Form>
    )
}

export default RegisterForm;