import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/scss/common/reset.scss';
import './resources/scss/common/common.scss';
import DefaultLayout from './pages/default/DefaultLayout';

function App() {
  return (
    <div className="App">
      <DefaultLayout/>
    </div>
  );
}

export default App;
