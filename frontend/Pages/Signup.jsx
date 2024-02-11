import { InputGroup } from '../src/components/InputGrp';
import { useExtractedFormData } from '../src/hooks/extractedFormData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const idsArray = ['firstName', 'lastName', 'email', 'password']
  const body = useExtractedFormData(idsArray)
  const navigate = useNavigate()
  
  const signUpSubmission = () => {
    axios.post('http://127.0.0.1:3000/api/signup', body).then(({data})=>{
      localStorage.setItem('paytm_token', data.token)
      navigate('/', {
        state: {
          message: "Signed In!",
          status: "green",
        }
      })
    })
    .catch((res)=>{
      alert(res.response.data.message)
    })
}

  return (
    <div className="w-full text-black p-6 rounded-lg m-4 md:max-w-[400px]" style={{background: 'white'}}>
        <h1 className='m-auto w-fit text-3xl font-bold'>Sign Up</h1>
        <p className='text-gray-500 m-auto text-center my-3 font-semibold'>Register your details to create a account</p>
          <hr />

        <InputGroup id='firstName' label='First Name' type='test'/>
        <InputGroup id='lastName' label='Last Name' type='text'/> 
        <InputGroup id='email' label='Email' type='email'/>
        <InputGroup id='password' label='Password' type='password'/>

        <button onClick={signUpSubmission} className='w-full bg-black text-white font-bold rounded-lg p-2' >
          Submit
        </button>

        <hr />
        
        <p className="m-auto text-sm text-gray-500 w-fit mt-4 cursor-pointer">Already have an account? <span className="text-black underline" onClick={()=>{navigate('/signin')}}>Sign In. </span></p>
    </div>
  )
}



export default Signup