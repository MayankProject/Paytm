import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Signup from '../Pages/Signup'
import Signin from '../Pages/Signin'
import Payment from '../Pages/Payment'
import NotFound from '../Pages/NotFound'
import Signout from './components/Signout'

function App() {
  return (
    <div className='bg-black min-h-[100vh] text-white flex justify-center items-center'>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signout' element={<Signout/>}/>
        <Route path='/pay/:id' element={<Payment/>}/>
        <Route path='/not-found' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
