import React,{useEffect} from 'react';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadForm  from '../../containers/upload/UploadForm';
import '../../resources/scss/upload/upload.scss';

const UploadPage = ({match}) => {
    return (
        <div className="upload">
            <Switch>
                <Route path="/upload/:workNumber" component={UploadForm}/>
                <Route path="/upload" component={UploadForm}/>
            </Switch>
        </div>
    )
}

export default UploadPage;