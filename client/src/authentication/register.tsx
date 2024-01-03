import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { validateEmail, validateName, validatePassword } from "./validate.user"

interface RegisterDetails {
  email: string
  name: string
  password: string
}

interface RegisterInputs {
  email: { value: string; valid: boolean }
  name: { value: string; valid: boolean }
  password: { value: string; valid: boolean }
}

export default function Register() {
  const navigate = useNavigate()
  const [input, setInputs] = useState<RegisterInputs>({
    email: { value: "", valid: true },
    name: { value: "", valid: true },
    password: { value: "", valid: true },
  })
  const [responseMessage, setResponseMessage] = useState("")
  const [responseStatus, setResponseStatus] = useState(0)

  useEffect(() => {
    console.log("Ab")
    if (localStorage.getItem("email") != null) {
      navigate("/home", { replace: true })
    }
  }, [])

  const callRegister = (event: any) => {
    event.preventDefault()
    const body: RegisterDetails = {
      email: input.email.value.toLowerCase(),
      name: input.name.value,
      password: input.password.value,
    }
    const isPasswordValid = validatePassword(input.password.value)
    const isEmailValid = validateEmail(input.email.value)
    const isNameValid = validateName(input.name.value)

    console.log(isEmailValid)

    setInputs({
      email: { value: input.email.value, valid: isEmailValid },
      name: { value: input.name.value, valid: isNameValid },
      password: { value: input.password.value, valid: isPasswordValid },
    })

    if (isEmailValid && isPasswordValid && isNameValid)
      axios
        .post("/api/register", body)
        .then((response: AxiosResponse) => {
          setInputs({
            email: { value: "", valid: true },
            name: { value: "", valid: true },
            password: { value: "", valid: true },
          })
          console.log(response.data)
          setResponseStatus(response.data.status)
          setResponseMessage(response.data.msg)
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
  }

  const handleChange = (name: string) => (event: any) => {
    event.preventDefault()
    setInputs((prevState) => {
      return { ...prevState, [name]: { value: event.target.value, valid: true } }
    })
  }

  return (
    <div className='font-mono font-semibold min-h-screen min-w-screen flex flex-col items-center justify-center'>
      <form className='flex flex-col p-5 md:shadow-lg md:w-2/4 md:border-2 w-full  gap-3'>
        <span className='text-2xl text-blue-400 self-center'>Join Now</span>
        <input
          className={`rounded p-3 m-1 border-2 ${
            input.email.valid ? "border-blue-400" : "border-red-400"
          } text-gray-700`}
          value={input.email.value}
          onChange={handleChange("email")}
          type='text'
          placeholder='Email'
        />
        {!input.email.valid && (
          <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>Email is not valid</span>
        )}
        <input
          className={`rounded p-3 m-1 border-2 ${
            input.name.valid ? "border-blue-400" : "border-red-400"
          } text-gray-700`}
          value={input.name.value}
          onChange={handleChange("name")}
          type='text'
          placeholder='Name'
        />
        {!input.name.valid && (
          <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
            Name should only contain alphabet characters.
          </span>
        )}
        <input
          className={`rounded p-3 m-1 border-2 ${
            input.password.valid ? "border-blue-400" : "border-red-400"
          } text-gray-700`}
          value={input.password.value}
          onChange={handleChange("password")}
          type='password'
          placeholder='Password'
        />
        {!input.password.valid && (
          <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
            Password must have both alphabet letters, atleast one special character and one number.
          </span>
        )}
        {responseMessage != "" && (
          <div>
            <span className={`m-1 ${responseStatus == 400 ? "text-red-400" : "text-green-400"}`}>
              {responseMessage}
            </span>
            <a className='m-1 underline' href='/login'>
              Login
            </a>
          </div>
        )}
        <button className='bg-blue-400 text-white p-3 m-1 rounded' onClick={callRegister}>
          {" "}
          Register{" "}
        </button>
      </form>
    </div>
  )
}
