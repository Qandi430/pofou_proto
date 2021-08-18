import React from 'react';
import {Route, Switch } from 'react-router';
import Login from '../../containers/auth/Login';
import Register from '../../containers/auth/Register';
import SelectMemberType from '../../containers/auth/SelectMemberType';
import '../../resources/scss/auth/auth.scss';
import { createCommonConsumer } from '../../context/commonContext';

const AuthPage = ({location}) => {
    return (
        <div className={`auth ${location.pathname.indexOf("/auth/selectMemberType") > -1 ? "selectMemberType":""}`}>
            <Switch>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
                <Route path="/auth/selectMemberType" component={SelectMemberType}/>
            </Switch>
        </div>
    )
}

export default createCommonConsumer(AuthPage);