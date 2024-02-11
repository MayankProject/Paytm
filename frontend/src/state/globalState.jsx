import { useNavigate } from "react-router-dom";
import { atom, atomFamily, selector } from "recoil";

export const inputHandler = atomFamily({
    key: 'inputHandler',    
    default: '',
})

export const sessionData = atom({
    key: 'userInfo',
    default: '',
})