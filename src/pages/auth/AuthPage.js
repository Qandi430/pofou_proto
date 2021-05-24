import React from 'react';
import {Route, Switch } from 'react-router';
import Login from '../../containers/auth/Login';
import Register from '../../containers/auth/Register';
import '../../resources/scss/auth/auth.scss';

const AuthPage = () => {
    return (
        <div className="auth">
            <Switch>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
            </Switch>
        </div>
    )
}

export default AuthPage;