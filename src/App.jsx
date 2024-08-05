// import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar';
import AllTasks from './components/AllTasks';
import Signup from './Auth/Signup';
import Signin from './Auth/Signin';

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<AllTasks />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
