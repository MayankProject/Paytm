import React from "react"
import { useRecoilState } from "recoil"
import { inputHandler } from "../state/globalState"

export const InputGroup = React.memo(({label, type, id})=>{
    const [input, changeInputValue] = useRecoilState(inputHandler(id))
    return(
      <div className="font-semibold text-md my-3 input-grp">
        <p className='my-3'>{label}</p>
        <input type={type} value={input} onChange={(e)=>{changeInputValue(e.target.value)}} className='w-full px-4 py-2 border-[1px] border-gray-500 rounded-md' />
      </div>
    )
  })