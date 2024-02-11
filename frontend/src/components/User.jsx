import { useNavigate } from "react-router-dom"
import Badge from "./Badge"
import { memo } from "react"

const User = memo(({letter, Name, id})=>{
  const navigate = useNavigate()
  const requestPayment = () => {
    navigate(`/pay/${id}`)
  }
  return (
    <div  onClick={requestPayment} className=" cursor-pointer px-4 my-4">
        <div className="flex my-4 justify-between">
            <div className="flex gap-2 items-center">
                <Badge>
                    {letter}
                </Badge>
                <h1>{Name}</h1>
            </div>

            <button className="border-white border-2 rounded-md px-3 hover:shadow-sm hover:translate-x-[1px] hover:-translate-y-[1px] hover:shadow-white transition">
                Send Money
            </button>
        </div>
        <hr className="opacity-[0.3]"/>
    </div>
  )
})

export default User