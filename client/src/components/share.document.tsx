import { useContext, useState } from "react"
import { MenuContext } from "../home/home"
import axios, { AxiosResponse } from "axios"
import FloatingLabel from "./floatinglabel"

enum Status { 
  ERROR = 400 ,
  SENT = 200,
  WAITING = 1,
  IDLE = 0,
}
export default function ShareDocument() {
  const menuContext = useContext(MenuContext)
  if (!menuContext) return

  const { openMenu, sharePopup, setSharePopup } = menuContext

  const [recipient , setRecipient] = useState<string>('')
  const [response , setResponse] = useState<{msg:string,status:Status}>({msg : '', status : Status.IDLE})

  const handleLoadPopup = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).id !== "nodetect") {
      setSharePopup(false)
    }
  }

  const handleShare = (_: React.MouseEvent<HTMLButtonElement>) => {
    if(!openMenu) return //ERROR// TODO
    setResponse({msg:'Wait',status:Status.WAITING})
    axios.post("/api/share",{
      id : openMenu.id,
      recipient : recipient 
    },{
      headers : {
        authorization : "Bearer "+ localStorage.getItem('token')
      }
    }).then((response : AxiosResponse) => {
      if(response && response.data.status == Status.ERROR){
        setResponse(response.data)
        return setTimeout(()=>setResponse({msg:'',status:Status.IDLE}),3000);
      }
      if(response && response.data.status == Status.SENT) {
        setResponse(response.data)
        return setTimeout(()=>{setResponse({msg:'',status:Status.IDLE});setSharePopup(false)},3000);
      }
      
      setResponse({msg:'Something went wrong',status:Status.ERROR})
      setTimeout(()=>setResponse({msg:'',status:Status.ERROR}),2000);
     })
  }

  return (
    <>
    {sharePopup && (
      <div
        className='text-base fixed top-0 bg-black bg-opacity-50 w-screen h-screen flex items-center justify-center border'
        onClick={handleLoadPopup}
      >
        <div id={"nodetect"} className='bg-gray-50 p-5 md:w-2/6 w-4/5 rounded flex flex-col'>
          <input
            id={"nodetect"}
            className={`rounded p-3 m-1 border-2 border-blue-400 text-black` }
            type='email'
            name='email'
            placeholder='Recipient Email'
            onChange={(event)=>setRecipient(event.target.value)}
          />
          <button
            id={"nodetect"}
            className={`hover:opacity-80 cursor-pointer text-white p-3 m-1 rounded ${(response.status == Status.SENT) ? 'bg-green-400' : (response.status == Status.WAITING) ? 'cursor-wait bg-blue-400' : 'bg-blue-400'} ` }
            onClick={handleShare}
          >
            {
              (Status.WAITING == response.status) ? 'Wait' : (Status.SENT == response.status) ? 'Sent ✅' : 'Send'
            }
          </button>
        </div>
      </div>
    )}
    {response.status == Status.ERROR && <FloatingLabel> {response.msg} </FloatingLabel>}
    </>
  )
}
