import { useState } from 'react'
import {BrowserRouter as Router , Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import Menu from './pages/Menu'
import Account from './pages/Account'
import Sales from './pages/Sales'

function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  
  return (
    <>
    <Router>
    {loggedIn && <Navbar setLoggedIn={setLoggedIn}/>
    }
    <Routes>
      <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>}/>
      <Route path="/Menu" element={<Menu/>}/>
      <Route path="/Account" element={<Account name='Admin' email='admin@gmail.com' role="Admin"/>}/>
      <Route path='/Sales' element={<Sales/>}/>
    </Routes>
    
    </Router>
    </>
  )
}

export default App
