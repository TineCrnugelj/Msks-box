import { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
