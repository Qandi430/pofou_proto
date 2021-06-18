import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './containers/common/Header';
import MainPage from './pages/main/MainPage';
import './resources/scss/common/reset.scss';
import './resources/scss/common/common.scss';
import { Route, Switch } from 'react-router';
import UploadPage from './pages/upload/UploadPage';
import AuthPage from './pages/auth/AuthPage';
import {CommonProvider} from './context/commonContext';
import Archive from './pages/contents/Archive';
import Resume from './pages/contents/Resume';
import MyPage from './pages/myPage/MyPage';
import Portfolio from './pages/myPage/Portfolio';

function App({history}) {
  // console.log(history)
  return (
    <CommonProvider history={history}>
      <Header/>
      <Switch>
        <Route path="/upload" component={UploadPage}/>
        <Route path="/auth" component={AuthPage}/>
        <Route path="/archive" component={Archive}/>
        <Route path="/resume" component={Resume}/>
        <Route path="/myPage" component={MyPage}/>
        <Route path="/portfolio" component={Portfolio}/>
        <Route path="/" component={MainPage}/>
      </Switch>
      </CommonProvider>
  );
}

export default App;
