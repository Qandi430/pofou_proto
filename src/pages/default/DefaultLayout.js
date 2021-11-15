import React, { Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { CommonProvider } from '../../context/commonContext';
import Header from '../../containers/common/Header';
import "react-datepicker/dist/react-datepicker.css";
import Footer from '../../containers/common/Footer';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const UploadPage = React.lazy(() => import('../upload/UploadPage'));
const AuthPage = React.lazy(() => import('../auth/AuthPage'));
const Archive = React.lazy(() => import('../contents/Archive'));
const Resume = React.lazy(() => import('../contents/Resume'));
const MyPage = React.lazy(() => import('../myPage/MyPage'));
const Portfolio = React.lazy(() => import('../myPage/Portfolio'));

const MainPage = React.lazy(() => import('../main/MainPage'));


class DefaultLayout extends Component{
    render(){
        return (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <Route path="/" render={(props) => <LayoutWrap {...props}/>}/>
                </React.Suspense>
            </BrowserRouter>
        )
    }
}

const LayoutWrap = ({location,match,history}) => {
    return (
        <CommonProvider location={location} match={match} history={history}>
            <Header location={location} match={match} history={history}/>
            <Switch>
                <Route path="/upload" component={UploadPage}/>
                <Route path="/auth" component={AuthPage} location={location}/>
                <Route path="/archive" component={Archive}/>
                <Route path="/resume" component={Resume}/>
                <Route path="/myPage" component={MyPage}/>
                <Route path="/portfolio" component={Portfolio}/>
                <Route path="/" component={MainPage}/>
            </Switch>
            <Footer/>
        </CommonProvider>
    )
}

export default DefaultLayout;