import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loginToken } from '../src/hooks/loggedIn'
import { sessionData } from '../src/state/globalState'
import Badge from '../src/components/Badge'
import axios from 'axios'

function Payment() {
  const {id} = useParams()
  const [Info, setInfo] = useState(null);
  const [Amount, setAmount] = useState(0);
  const navigate = useNavigate()
  const token = loginToken()

  useEffect(() => {
    if (token) {
        axios.get(`http://127.0.0.1:3000/api/users/${id}`, {
            headers: {
            token: token
            }
        }).then(({data})=>{
          setInfo(data)
        }).catch((res)=>{
          navigate('/not-found')
        })
    }
  }, [sessionData]);

  const Transact = () => {
    axios.post('http://127.0.0.1:3000/api/transact', {
      to: id,
      amount: Number(Amount),
    }, {
      headers: {
        token: token
      }
    }).then(()=>{
      navigate('/', {
        state: {
          message: "Transaction Completed!",
          status: "green",
        }
      })
    }).catch(({response})=>{
      alert(response.data.message)
    })
  }
  return (
    <div className='border-4 border-white p-[50px] rounded-md'>
        {Info && <>
            <h1 className=' bordtext-center text-4xl font-bold'>Send Money</h1>
            <hr  className='mb-5 mt-3'/>
              <div className='flex items-center gap-2'>
                  <Badge>
                    {Info.firstName[0]}
                  </Badge>
                  <h1 className='font-bold text-2xl'>
                    {Info.firstName}
                  </h1>
              </div>              
              <div className='flex mt-3 flex-col'>
                Amount (in rupees)
                <input value={Amount} onChange={(e)=>{setAmount(e.target.value)}} type="number" className='rounded-md bg-black outline-none border-2 border-white mt-3 px-2 py-2'/> 
                <button onClick={Transact} className='border-white border-2 text-white bg-gray-950 my-2 w-full rounded-md px-3 py-1 hover:shadow-sm hover:translate-x-[1px] hover:-translate-y-[1px] hover:shadow-white transition'>Pay</button>
              </div>
          </>}
    </div>
  )
}

export default Payment