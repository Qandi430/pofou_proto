import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import Header from './containers/common/Header';
import { CommonProvider } from './context/commonContext';
import UploadPage from './pages/upload/UploadPage';
import AuthPage from './pages/auth/AuthPage';

import MainPage from './pages/main/MainPage';
const DefaultLayout = () => {
    return(
        <CommonProvider>
            <Header/>
            <Switch>
                <Route path="/upload" component={UploadPage}/>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/" component={MainPage}/>
            </Switch>
        </CommonProvider>
    )
}

export default DefaultLayout;