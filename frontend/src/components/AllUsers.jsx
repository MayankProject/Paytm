import { useEffect, useState } from "react";
import User from "./User"
import axios from "axios";
import { loginToken } from "../hooks/loggedIn";

function AllUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState(null)
  const token = loginToken()

  const fetchAllUsers = async () => {
    let url = 'http://127.0.0.1:3000/api/users'

    if (searchQuery && searchQuery.trim().length>0) {
      url += `/search/${searchQuery}`
    }

    await axios.get(url, {
      headers: {
        token: token
      }
    }).then(({data})=>{
      setAllUsers(data)
    })
    .catch((res)=>{
      alert(res.response.data.message)
    })
  }

  useEffect(() => {
    if (token) {
      fetchAllUsers()
    }
  }, [searchQuery]);  

  return (
    <div className="p-4">
        <h1 className="font-bold text-2xl">All Users :</h1>
        <hr className="my-5 opacity-20" />
        <input type="text" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} placeholder="Search Users" className="my-4 text-black px-3 py-2 w-full rounded-md outline-none" />
        {
          allUsers ?
          <div> 
            {
              allUsers.map((user)=>{
                return <User key={user._id} id={user._id} letter={user.firstName[0]} Name={`${user.firstName}  ${user.lastName}`}/>
              })
            } 
          </div>  
          :
          <h1 className="text-5xl font-bold text-center my-5">No Users Here</h1>        
        }
    </div>
  )
}

export default AllUser