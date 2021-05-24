import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import Header from './containers/common/Header';
import MainPage from './pages/main/MainPage';
import './resources/scss/common/reset.scss';
import './resources/scss/common/common.scss';
import { Route, Switch } from 'react-router';
import UploadPage from './pages/upload/UploadPage';
import AuthPage from './pages/auth/AuthPage';
function App() {
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path="/upload" component={UploadPage}/>
        <Route path="/auth" component={AuthPage}/>
        <Route path="/" component={MainPage}/>
      </Switch>
    </Fragment>   
  );
}

export default App;
