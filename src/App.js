import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import Header from './containers/common/Header';
import MainPage from './pages/main/MainPage';
import './resources/scss/common/reset.scss';
import './resources/scss/common/common.scss';
function App() {
  return (
    <Fragment>
      <Header/>
      <MainPage/>
    </Fragment>   
  );
}

export default App;
