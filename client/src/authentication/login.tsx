import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail,validatePassword } from "./validate.user"
import axios, { AxiosError, AxiosResponse } from "axios"
import FloatingLabel from "../components/floatinglabel"

interface LoginTextField {
  value : string
  status : number
}

interface LoginDetails{
  email : string
  password : string
}

export default function Login(){
    const navigate = useNavigate()
    const [email,setEmail] = useState<LoginTextField>({value : '', status : 200})
    const [password,setPassword] = useState<LoginTextField>({value : '', status : 200})
    const [error, setError] = useState<AxiosError>()

    useEffect(()=>{
        if(localStorage.getItem('email')){
          navigate('/home',{ replace:true} ) 
        } 
      },[])

    const callLogin = async (body : LoginDetails) => {
       axios.post('/api/login',body,{timeout : 5000}).then((response : AxiosResponse)=>{
          switch(response.data.status){
            case 200 :
              localStorage.setItem('email',response.data.email)
              localStorage.setItem('name',response.data.name)
              localStorage.setItem('token',response.data.token)
              navigate('/home')
              break;
            case 404: 
              setEmail({value: email.value , status : 404})
              break;
            case 401:
              setPassword({value: password.value , status : 401})
              break;
          }
       }).catch((error : AxiosError)=>{
          setError(error)
          setTimeout(()=>setError(undefined),5000)
       })
    }
      
    return(
    <div className='font-mono font-semibold min-h-screen min-w-screen flex flex-col items-center justify-center '>
      <form className='flex flex-col p-5 md:shadow-lg md:w-2/4 md:border-2 w-full  gap-3' onSubmit={(event)=>{
        event.preventDefault();
        const isPasswordValid = validatePassword(password.value);
        const isEmailValid = validateEmail(email.value);

        setEmail({value : email.value, status : isEmailValid ? 200 : 400 })
        setPassword({ value : password.value , status  : isPasswordValid ? 200 : 400 })

        if(isEmailValid && isPasswordValid)
        callLogin({email : email.value , password : password.value})
      }}>

        <span className="text-2xl text-blue-400 self-center">Welcome, master!</span>
        <input className={`rounded p-3 m-1 border-2 ${email.status == 200?'border-blue-400':'border-red-400'} text-gray-700`}
          value={email.value}  onChange={(event)=>{setEmail({value : event.target.value,status : 200})}}   type="text" placeholder="Email"/>
        {email.status !== 200 &&  <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
          {email.status == 400 
          ? "Email is not valid."
          : "User does not exist!"
          }
        </span> 
        }
        <input className={`rounded p-3 m-1 border-2 ${password.status == 200?'border-blue-400':'border-red-400'} text-gray-700`}
          value={password.value}  onChange={(event)=>{setPassword({value : event.target.value, status : 200})}}  type="password" placeholder="Password"/>
        {
          password.status !== 200 &&  <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
          {password.status == 400 
          ? "Password must have both alphabet letters, atleast one special character and one number." 
          : "Password is incorrect!"
          }
          </span> 
        }
        <button type='submit' className='bg-blue-400 text-white p-3 m-1 rounded select-none'> Enter </button>
      
      </form>

      {error && <FloatingLabel>{error?.message}</FloatingLabel>}
      
    </div>)
}