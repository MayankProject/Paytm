import { InputGroup } from '../src/components/InputGrp';
import { useExtractedFormData } from '../src/hooks/extractedFormData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signin() {
  let navigate = useNavigate()
  
  const body = useExtractedFormData(['emailSignIn', 'passwordSignIn'])

  const signInSubmission = async () => {
    await axios.post('http://127.0.0.1:3000/api/signin', {email: body.emailSignIn, password: body.passwordSignIn}).then((res)=>{
      localStorage.setItem('paytm_token', res.data.token)
      axios.defaults.headers.post['token'] = res.data.token
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
        <h1 className='m-auto w-fit text-3xl font-bold'>Sign In</h1>
        <p className='text-gray-500 m-auto text-center my-3 font-semibold'>Enter your details to sign in, Easy right?</p>
      <hr />
        <InputGroup id='emailSignIn' label='Email' type='email'/>
        <InputGroup id='passwordSignIn' label='Password' type='password'/>

        <button onClick={signInSubmission} className='w-full bg-black text-white font-bold rounded-lg p-2'>
          Submit
        </button>
        
        <hr />
        <p className="m-auto text-sm text-gray-500 w-fit mt-4 cursor-pointer">Don't have an account? <span className="text-black underline" onClick={()=>{navigate('/signup')}}>Register? </span></p>
    </div>
  )
}

export default Signin