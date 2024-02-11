import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sessionData } from "../state/globalState";
import { useEffect } from "react";

export default function Navbar() {
  let session = useRecoilValue(sessionData);
  console.log(session)
  const navigate = useNavigate()
  return (
    <>
      <nav className="flex justify-between  p-4 items-center">
        <h1 className="text-3xl font-bold">Paytm</h1>
        {
          session ? 
          <div className="flex gap-4 items-center">
            Hello, {session.firstName}
              <Badge>
                  {session.firstName[0]}
              </Badge>
          <button className="border-white border-2 rounded-md px-3 hover:shadow-sm hover:translate-x-[1px] hover:-translate-y-[1px] hover:shadow-white transition p-2" onClick={()=>{
            navigate('/signout')
          }}>
            Sign Out
          </button>
          </div>
          :
          <button className="border-white border-2 rounded-md px-3 hover:shadow-sm hover:translate-x-[1px] hover:-translate-y-[1px] hover:shadow-white transition p-2" onClick={()=>{
            navigate('/signin')
          }}>
            Sign In
          </button>
        }
      </nav>
    </>
  );
}

