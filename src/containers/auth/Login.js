import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/login/LoginForm';
import SnsLogin from '../../components/auth/login/SnsLogin';

const Login = () => {
    return (
        <div className="loginWrap">
            <div className="titleBox">
                <img src={`https://storage.googleapis.com/pofou_repo/resources/logo.png`} alt="" />
                <h3 className="pageTitle">시작하기</h3>
            </div>
            <LoginForm/>
            <SnsLogin/>
            <Link to="/auth/register" className="linkRegister">아직 포포유 회원이 아니신가요? <span>회원가입</span></Link>
        </div>
    )
}

export default Login;