import { useRecoilValue } from "recoil"
import { sessionData } from "../state/globalState"

function YourBalance({amount}) {
  const {balance} = useRecoilValue(sessionData) 
  return (
    <>
      <div className="p-4 text-xl">
          Your Balance : <span className="font-bold"> {balance}$ </span>
      </div>
    </>
  )
}

export default YourBalance