import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { sessionData } from '../state/globalState'

function Signout() {
  const navigate = useNavigate()
  const setSession = useSetRecoilState(sessionData)
  
  localStorage.clear()
  
  useEffect(() => {
    setSession('')
    navigate('/', {
      state: {
        message: "Logged Out!",
        status: "green",
      }
    })
  }, []);

  return (
    <div>Signout</div>
  )
}

export default Signout