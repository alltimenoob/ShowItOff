import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const callValidate = async () => {
    return await axios.get('/api/validate-user',{ headers : { Authorization : 'Bearer '+localStorage.getItem('token') } }).then(()=>{
        return true
    }).catch(()=>{
        return false
    })
}

export default function PrivateRoutes(){
    const [isLoggedIn , setIsLoggedIn] = useState(true)
    const [isValidated,setIsValidated] = useState(false)
    
    useEffect( () => {
        callValidate().then((valid : boolean)=>{
            if(valid) {
                setIsLoggedIn(true)
            } else {
                localStorage.clear()
                setIsLoggedIn(false)
            }
            setIsValidated(true)
        })
    },[isLoggedIn])

    if(!isValidated) return(
    <span>Loading...</span>
    )

    return( isLoggedIn ? <Outlet/> : <Navigate to='/'/>)
}