import { useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';

function App()  {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('email')){
      navigate('/home',{ replace:true} ) 
    } 
  },[])

  return (
    <div className='font-mono font-semibold min-h-screen min-w-screen flex flex-col items-center justify-center '>

        <div className='flex flex-col items-center'>

          <div className='flex items-center lg:flex-row-reverse gap-x-5 flex-col-reverse'>
            <div className='text-center flex gap-x-3 text-5xl animate-slideOut select-none'>
              <p className='text-blue-400'>Show</p>
              <p className='text-yellow-400'>It</p>
              <p className='text-red-400'>Off</p>
            </div>
            <img className='animate-slideIn w-48 lg:w-full' src='/documents.svg' alt='Show It Off Logo' />
          </div>
          
          <div className='animate-delay p-10 w-full flex flex-col justify-center items-center gap-y-10 lg:gap-x-10 lg:flex-row'>
            <button className='flex-1 bg-blue-400 text-white p-3 rounded w-52' onClick={()=>navigate('login')}>Login</button>
            <button className='flex-1 bg-blue-400 text-white p-3 rounded w-52' onClick={()=>navigate('register')}>Sign Up</button>
          </div>

        </div>
      
    </div>
  )
}

export default App
