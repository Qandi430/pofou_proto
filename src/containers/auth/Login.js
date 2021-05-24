import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/login/LoginForm';
import SnsLogin from '../../components/auth/login/SnsLogin';

const Login = () => {
    return (
        <div className="loginWrap">
            <h3 className="pageTitle">로그인 하기</h3>
            <LoginForm/>
            <SnsLogin/>
            <Link to="/auth/register" className="linkRegister">아직 포포유 회원이 아니신가요? <span>회원가입</span></Link>
        </div>
    )
}

export default Login;