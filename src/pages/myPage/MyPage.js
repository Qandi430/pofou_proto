import React from 'react';
import { Route, Switch } from 'react-router';
import Profile from '../../containers/myPage/Profile';
import "../../resources/scss/myPage/myPage.scss";

const MyPage = () => {
    return (
        <div className="myPage">
            <Switch>
                <Route path="/myPage/profile" component={Profile}/>
            </Switch>
        </div>
    )
}

export default MyPage;