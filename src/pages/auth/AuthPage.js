import React, { useState } from 'react';
import {Route, Switch } from 'react-router';
import Login from '../../containers/auth/Login';
import Register from '../../containers/auth/Register';
import SelectMemberType from '../../containers/auth/SelectMemberType';
import '../../resources/scss/auth/auth.scss';
import { createCommonConsumer } from '../../context/commonContext';

const AuthPage = ({location}) => {

    const [authBg,setAuthBg] = useState("/resources/auth_bg_train.jpeg");

    return (
        <div className={`auth ${location.pathname.indexOf("/auth/selectMemberType") > -1 ? "selectMemberType":""}`} style={{backgroundImage : `url(https://storage.googleapis.com/pofou_repo${authBg})`}}>
            <Switch>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
                <Route path="/auth/selectMemberType" component={SelectMemberType}/>
            </Switch>
        </div>
    )
}

export default createCommonConsumer(AuthPage);