import { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import AddRun from "./pages/AddRun"
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-run' element={<AddRun />} />
            <Route path='/register' element={<Register />}  />
            <Route path='/login' element={<Login />}  />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
