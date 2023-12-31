import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateName , validatePassword } from "./validate.user";

interface RegisterDetails {
    email : string
    name : string
    password : string
}

export default function Register(){
    const navigate = useNavigate()
    const [email ,setEmail] = useState({value : '', valid : true})
    const [name,setName] = useState({value : '', valid : true})
    const [password,setPassword] = useState({value : '', valid : true})
    const [responseMessage,setResponseMessage] = useState('')
    const [responseStatus,setResponseStatus] = useState(0)
      
    useEffect(()=>{
        if(localStorage.getItem('email')!=null){
        navigate('/home',{replace:true})
        } 
    },[])

    const callRegister = async(body : RegisterDetails) =>{
        axios.post('/api/register',
            body
        ).then((response : AxiosResponse)=>{
            setEmail({value: '', valid : true})
            setPassword({value : '', valid : true})
            setName({value : '' , valid : true})
                
            setResponseStatus(response.data.status)
            setResponseMessage(response.data.msg)
        }).catch();
    }

    return(
        <div className='font-mono font-semibold min-h-screen min-w-screen flex flex-col items-center justify-center' >
            
            <form className='flex flex-col p-5 md:shadow-lg md:w-2/4 md:border-2 w-full  gap-3' onSubmit={(_)=>{
                const isPasswordValid = validatePassword(password.value);
                const isEmailValid = validateEmail(email.value);
                const isNameValid = validateName(name.value);

                setEmail({value : email.value,valid : isEmailValid })
                setName({value : name.value , valid : isNameValid})
                setPassword({ value : password.value , valid  : isPasswordValid })

                if(isEmailValid && isPasswordValid && isNameValid)
                callRegister({ email : email.value , name : name.value ,  password : password.value })
            }}>

            <span className="text-2xl text-blue-400 self-center">Join Now</span>
            <input className={`rounded p-3 m-1 border-2 ${email.valid?'border-blue-400':'border-red-400'} text-gray-700`}
                value={email.value}  onChange={(event)=>{setEmail({valid: true, value : event.target.value})}}   type="text" placeholder="Email"/>
            {!email.valid &&  <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>Email is not valid</span> }
            <input className={`rounded p-3 m-1 border-2 ${name.valid?'border-blue-400':'border-red-400'} text-gray-700`}
                value={name.value}  onChange={(event)=>{setName({valid: true, value : event.target.value})}}  type="text" placeholder="Name"/>
            {!name.valid &&  <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>Name should only contain alphabet characters.</span> }
            <input className={`rounded p-3 m-1 border-2 ${password.valid?'border-blue-400':'border-red-400'} text-gray-700`}
                value={password.value}  onChange={(event)=>{setPassword({valid: true, value : event.target.value})}}  type="password" placeholder="Password"/>
            {!password.valid &&  <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>Password must have both alphabet letters, atleast one special character and one number.</span> }  
            {responseMessage!='' && 
                <div>
                <span className={`m-1 ${(responseStatus==400?'text-red-400':'text-green-400')}`}>{responseMessage}</span> 
                <a className="m-1 underline" href="/login" >Login</a>  
                </div>
            }
            <button type="submit" className='bg-blue-400 text-white p-3 m-1 rounded'> Register </button>
            
            </form>
        </div>
    )
}