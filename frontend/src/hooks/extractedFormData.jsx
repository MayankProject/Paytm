import { useRecoilValue } from "recoil";
import { inputHandler } from "../state/globalState";

export const useExtractedFormData = (idsArray)=>{
    const body = {};
    idsArray.forEach((id) => {
        body[id] = useRecoilValue(inputHandler(id));
    })
    return body
}
  