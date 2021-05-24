import React from 'react';
import RegisterForm from '../../components/auth/register/RegisterForm';
import SnsRegister from '../../components/auth/register/SnsRegister';

const Register = () => {
    return(
        <div className="registerWrap">
            <h3 className="pageTitle">가입 하기</h3>
            <RegisterForm/>
            <SnsRegister/>
        </div>
    )
}

export default Register;