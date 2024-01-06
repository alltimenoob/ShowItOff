import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail, validatePassword } from "./validate.user"
import axios, { AxiosError, AxiosResponse } from "axios"
import FloatingLabel from "../error/floatinglabel"

interface LoginDetails {
  email: string
  password: string
}

interface LoginInputs {
  email: { value: string; status: number }
  password: { value: string; status: number }
}

enum Status {
  OK = 200,
  NOTFOUND = 404,
  FORBIDDEN = 401,
  ERROR = 400,
}

export default function Login() {
  const navigate = useNavigate()
  const [input, setInput] = useState<LoginInputs>({
    email: { value: "", status: Status.OK },
    password: { value: "", status: Status.OK },
  })
  const [error, setError] = useState<AxiosError>()

  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/home", { replace: true })
    }
  }, [])

  const callLogin = async (body: LoginDetails) => {
    axios
      .post("/api/login", body, { timeout: 5000 })
      .then((response: AxiosResponse) => {
        switch (response.data.status) {
          case Status.OK:
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("token", response.data.token)
            navigate("/home")
            break
          case Status.NOTFOUND:
            setInput((prevState) => ({
              ...prevState,
              email: { value: input.email.value, status: Status.NOTFOUND },
            }))
            break
          case Status.FORBIDDEN:
            setInput((prevState) => ({
              ...prevState,
              password: { value: input.password.value, status: Status.FORBIDDEN },
            }))
            break
        }
      })
      .catch((error: AxiosError) => {
        setError(error)
        setTimeout(() => setError(undefined), 5000)
      })
  }

  const handleChange = (name: string) => (event: any) => {
    event.preventDefault()
    return setInput((prevState) => ({
      ...prevState,
      [name]: { value: event.target.value, status: Status.OK },
    }))
  }

  return (
    <div className='min-w-[14rem] font-mono font-semibold h-screen w-screen flex flex-col items-center justify-center '>
      <form
        className='flex flex-col p-5 md:shadow-lg md:w-2/4 md:border-2 w-full  gap-3'
        onSubmit={(event) => {
          event.preventDefault()
          const isPasswordValid = validatePassword(input.password.value)
          const isEmailValid = validateEmail(input.email.value)
          setInput({
            password: {
              value: input.password.value,
              status: isPasswordValid ? Status.OK : Status.ERROR,
            },
            email: { value: input.email.value, status: isEmailValid ? Status.OK : Status.ERROR },
          })

          if (isEmailValid && isPasswordValid)
            callLogin({ email: input.email.value, password: input.password.value })
        }}
      >
        <span className='text-2xl m-1 text-blue-400 self-center text-ellipsis whitespace-nowrap'>
          Welcome, master!
        </span>
        <input
          autoComplete='true'
          className={`rounded p-3 m-1 border-2 ${
            input.email.status == Status.OK ? "border-blue-400" : "border-red-400"
          } text-gray-700`}
          value={input.email.value}
          onChange={handleChange("email")}
          type='text'
          placeholder='Email'
        />
        {input.email.status !== Status.OK && (
          <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
            {input.email.status == Status.ERROR ? "Email is not valid." : "User does not exist!"}
          </span>
        )}
        <input
          autoComplete='true'
          className={`rounded p-3 m-1 border-2 ${
            input.password.status == Status.OK ? "border-blue-400" : "border-red-400"
          } text-gray-700`}
          value={input.password.value}
          onChange={handleChange("password")}
          type='password'
          placeholder='Password'
        />
        {input.password.status !== Status.OK && (
          <span className={`m-1 text-sm mt-0 mb-0 text-red-400`}>
            {input.password.status == 400
              ? "Password must have both alphabet letters, atleast one special character and one number."
              : "Password is incorrect!"}
          </span>
        )}
        <button type='submit' className='bg-blue-400 text-white p-3 m-1 rounded select-none'>
          {" "}
          Enter{" "}
        </button>
      </form>

      {error && <FloatingLabel>{error?.message}</FloatingLabel>}
    </div>
  )
}
