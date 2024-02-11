import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/Navbar'
import YourBalance from '../src/components/YourBalance'
import AllUser from '../src/components/AllUsers'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { sessionData } from '../src/state/globalState'
import axios from 'axios'
import { loginToken } from '../src/hooks/loggedIn'
import { useLocation } from 'react-router-dom'

function Dashboard() {
  const setSession = useSetRecoilState(sessionData);
  const token = loginToken()
  const loggedIn = useRecoilValue(sessionData)
  const location = useLocation()
  const [Message, setMessage] = useState(null);
  const [Status, setStatus] = useState(null);
  
  setTimeout(() => {
    setMessage(null)
    window.history.replaceState({}, '')
  }, 2000);

  useEffect(()=>{
    if (token) {
      axios.get('http://127.0.0.1:3000/api/sessionData', {
        headers: {
          token: token
        }
      }).then(({data})=>{
          setSession(data)
      })
    }
    if (location.state) {
      setMessage(location.state.message)
      setStatus(location.state.status)
    }
  }, [])

  return (
    <>
    { Message && 
        <div className={`w-full Message absolute top-0 bg-${Status}-700 p-2`}>
          <h1>{Message}</h1>
        </div>
    }
      <div className='bg-black min-h-[100vh] w-full pt-[50px] text-white flex justify-center items-center'>
          <div className='w-full max-w-[900px]'>
              <Navbar/>
              {loggedIn && <YourBalance amount={10000}/>}
              <AllUser/>
          </div>
      </div>
    </>
  )
}

export default Dashboard