import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
