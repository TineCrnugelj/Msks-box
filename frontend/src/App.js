import { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import AddRun from "./pages/AddRun"
import UpdateRun from "./pages/UpdateRun"
import Header from './UI/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskDetails from "./pages/TaskDetails";
import Files from './pages/Files';
import ImageFullsize from "./pages/ImageFullsize";
import AddFile from "./pages/AddFile";

function App() {
  return (
    <Fragment>
      <Router>
        <Header/>
        <div className="App">
          <Routes>
            <Route path='/' element={<Navigate to='/tasks' replace/>} exact/>
            <Route path='/tasks/:hash' element={<TaskDetails />} />
            <Route path='/tasks/add-task' element={<AddRun />} />
            <Route path='/tasks' element={<Dashboard />} />
            <Route path='/update-run' element={<UpdateRun />} />
            <Route path='/register' element={<Register />}  />
            <Route path='/login' element={<Login />}  />
            <Route path='/files' element={<Files />}  />
            <Route path='/image/:imageName' element={<ImageFullsize />}  />
            <Route path='/files/new-file' element={<AddFile />}  />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
