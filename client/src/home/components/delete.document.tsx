import { useContext, useState } from "react"
import { MenuContext } from "../home"
import axios, { AxiosResponse } from "axios"
import FloatingLabel from "../../error/floatinglabel"

enum Status {
  ERROR = 400,
  DELETED = 200,
  WAITING = 1,
  IDLE = 0,
}

const AntiDetectionID = "no-detect-delete-document"

export default function DeleteDocument() {
  const menuContext = useContext(MenuContext)
  const [response, setResponse] = useState<{ msg: string; status: Status }>({
    msg: "",
    status: Status.IDLE,
  })

  if (!menuContext) return
  const { openMenu, setMenuItem, menuItem } = menuContext

  const handleLoadPopup = (event: React.SyntheticEvent) => {
    if ((event.target as HTMLElement).id !== AntiDetectionID) {
      setMenuItem((prevState) => {
        return { ...prevState, delete: false }
      })
    }
  }

  const handleDelete = () => {
    setResponse({ msg: "Wait", status: Status.WAITING })
    console.log(openMenu)
    const id = openMenu.id
    const token = localStorage.getItem("token")

    axios.delete(`/api/document/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response : AxiosResponse) => {
        if(response.data.status == Status.ERROR){
            setResponse(response.data)
            return setTimeout(
              () => setResponse({ msg: "", status: Status.IDLE }),
              2000
            )
        }
        else if(response.data.status == Status.DELETED){
            setResponse(response.data)
          return setTimeout(() => {
            setResponse({ msg: "", status: Status.IDLE })
            setMenuItem((prevState) => {
              return { ...prevState, delete: false }
            })
          }, 2000)
        }

        setResponse({ msg: "Something went wrong", status: Status.ERROR })
        setTimeout(() => setResponse({ msg: "", status: Status.ERROR }), 2000)
    })
  }

  return (
    <>
      {menuItem.delete && (
        <div
          className='text-base fixed top-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center border'
          onClick={handleLoadPopup}
        >
          <div
            id={AntiDetectionID}
            className='bg-gray-50 p-5 md:w-2/6 w-4/5 rounded flex flex-col'
          >
            <p
              id={AntiDetectionID}
              className={`rounded p-3 m-1  text-red-400 text-2xl`}
            >
              {`Deleting ${openMenu.title}!`}
            </p>
            <button
              id={AntiDetectionID}
              className={`hover:opacity-80 cursor-pointer text-white p-3 m-1 rounded ${
                response.status == Status.DELETED
                  ? "bg-green-400"
                  : response.status == Status.WAITING
                  ? "cursor-wait bg-red-400"
                  : "bg-red-400"
              } `}
              onClick={handleDelete}
            >
              {Status.WAITING == response.status
                ? "Wait"
                : Status.DELETED == response.status
                ? "Deleted ✅"
                : "Confirm"}
            </button>
          </div>
        </div>
      )}
      {response.status == Status.ERROR && (
        <FloatingLabel> {response.msg} </FloatingLabel>
      )}
    </>
  )
}
