import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  

  return (
    <div>
      <ToastContainer />
      <Provider store={appStore}>
        <Body/>
      </Provider>
    </div>
    
  );
}

export default App;
