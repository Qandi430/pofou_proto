import React, { useState,useEffect } from 'react';
import RegisterForm from '../../components/auth/register/RegisterForm';
import SnsRegister from '../../components/auth/register/SnsRegister';
import { checkAuthNumber, emailAuthentication, register } from '../../server/member/MemberServer';

const Register = () => {

    const [registrationForm,setRegistrationForm] = useState({
        email : "",
        emailAuth : "",
        emailAuthNumber : "",
        password : "",
        passwordConfirm : "",
        registerAgreement : false,
    });
    const [timerMinutes,setTimerMinutes] = useState(0);
    const [timerSeconds,setTimerSeconds] = useState(0);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(timerSeconds) > 0) {
                setTimerSeconds(parseInt(timerSeconds) - 1);
            }
            if (parseInt(timerSeconds) === 0) {
              if (parseInt(timerMinutes) === 0) {
                clearInterval(countdown);
              } else {
                setTimerMinutes(parseInt(timerMinutes) - 1);
                setTimerSeconds(59);
              }
            }
          }, 1000);
          return () => clearInterval(countdown);
    }, [timerMinutes,timerSeconds]);

    const handleEmailAuthentication = async (e) => {
        e.preventDefault();
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!regExp.test(registrationForm.email)){
            setRegistrationForm({
                ...registrationForm,
                emailAuth : "invalid"
            });
        }else{
            const {data} = await emailAuthentication(registrationForm.email);
            if(data){
                setRegistrationForm({
                    ...registrationForm,
                    emailAuth : "valid"
                });
                setTimerMinutes(10);
                setTimerSeconds(0);
            }else{
                setRegistrationForm({
                    ...registrationForm,
                    emailAuth : "duplicate"
                }); 
            }
        }
    }

    const changeRegisterForm = (name,value) => {
        setRegistrationForm({
            ...registrationForm,
            [name] : value,
            emailAuth : name === "email" ? "" : registrationForm.emailAuth,
        });
    }

    const handleCheckAuthNumber = async(e) => {
        e.preventDefault();
        const {data} = await checkAuthNumber(registrationForm.emailAuthNumber);
        if(data){
            console.log("passed");
            setTimerMinutes(0);
            setTimerSeconds(0);
            setRegistrationForm({
                ...registrationForm,
                emailAuth : "collect"
            }); 
        }else{
            console.log("un passed");
            setRegistrationForm({
                ...registrationForm,
                emailAuth : "unCollect"
            }); 
        }
    }

    const submitRegistForm = async (e) => {
        e.preventDefault();
        if(registrationForm.email === ""){
            alert("???????????? ????????? ?????????.");
            document.getElementById("registerEmail").focus();
            return false;
        }else{
            if(registrationForm.emailAuth === "valid" || registrationForm.emailAuth === "unCollect"){
                alert("????????? ???????????? ??????????????? ??????????????????.");
                document.getElementById("registerEmailAuth").focus();
                return false;
            }
        }
        if(registrationForm.password === ""){
            alert("??????????????? ??????????????????.");
            document.getElementById("registerPassword").focus();
            return false;
        }
        if(registrationForm.passwordConfirm === ""){
            alert("??????????????? ?????? ??? ??????????????????.");
            document.getElementById("registerPasswordConfirm").focus();
            return false;
        }
        if(registrationForm.password !== registrationForm.passwordConfirm){
            alert("??????????????? ???????????? ????????????.");
            document.getElementById("registerPasswordConfirm").focus();
            return false;
        }
        if(!registrationForm.registerAgreement){
            alert("???????????? ????????? ????????? ?????????.");
            document.getElementById("registerAgreement").focus();
            return false;
        }
        const {data} = await register(registrationForm);
        console.log(data);
        if(data){
            window.location.href = "/";
        }
    }

    return(
        <div className="registerWrap">
            <div className="titleBox">
                <img src={`https://storage.googleapis.com/pofou_repo/resources/logo.png`} alt="" />
                <h3 className="pageTitle">????????????</h3>
            </div>
            <RegisterForm 
                registrationForm={registrationForm} 
                changeRegisterForm={changeRegisterForm} 
                handleEmailAuthentication={handleEmailAuthentication}
                handleCheckAuthNumber = {handleCheckAuthNumber}
                timerMinutes = {timerMinutes}
                timerSeconds = {timerSeconds}
                submitRegistForm={submitRegistForm}
            />
            <SnsRegister/>
        </div>
    )
}

export default Register;