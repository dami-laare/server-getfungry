import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/UI/Dashboard';
import Home from './components/UI/Home';
import Settings from './components/UI/Settings';
import CompleteRegistration from './components/userRegistration/CompleteRegistration';
import CreatePin from './components/userRegistration/CreatePin';
import Register from './components/userRegistration/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fluid main-body d-flex justify-content-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/completeRegistration' element={<CompleteRegistration/>} />
            <Route path='/create-pin' element={<CreatePin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user/settings' element={<Settings />} />
          </Routes>  
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
