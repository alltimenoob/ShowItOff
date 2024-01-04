import { useNavigate } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import DocumentGrid from "../components/document.grid."
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import ShareDocument from "../components/share.document"

const GET_DOCUMENTS = gql`
  query GetDocuments($email: String) {
    getDocuments(email: $email) {
      id
      title
      preview
      filename
    }
  }
`
export type Document = {
  id: string
  title: string
  preview: string
  filename: string
}

type MenuContextType = {
  openMenu: Document | undefined
  setOpenMenu: Dispatch<SetStateAction<Document | undefined>>
  sharePopup: boolean
  setSharePopup: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextType | null>(null)
export { MenuContext }

export default function Home() {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState<Document | undefined>(undefined)
  const [sharePopup, setSharePopup] = useState<boolean>(false)

  const { loading, error, data, refetch } = useQuery(GET_DOCUMENTS, {
    variables: { email: localStorage.getItem("email") as string },
    context: {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
  })

  useEffect(() => {
    if (data != null) refetch()
  }, [])

  return (
    <div className='lg:text-3xl text-xl lg:p-10 p-5 w-full font-mono font-bold text-blue-400 '>
      <div
        className='w-full flex justify-between select-none min-w-[300px]
      '
      >
        <span>Welcome, {localStorage.getItem("name")} </span>
        <a
          className='text-red-400 cursor-pointer'
          href='/'
          onClick={(_) => {
            localStorage.clear()
          }}
        >
          Log Out
        </a>
      </div>

      <form
        className={`mt-10 lg:w-40 lg:h-10 sm:h-10 sm:w-36 h-10 w-32 text-sm relative lg:justify-self-start xs:justify-self-center flex justify-center
                    cursor-pointer items-center text-clip text-blue-400 bg-blue-100  select-none`}
        encType='multipart/form-data'
        name='file'
        onClick={() => navigate("/upload")}
      >
        <p className='block absolute xs:text-xs'>Upload Document</p>
      </form>

      <section className='grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 justify-items-center items-center gap-3 min-w-[300px]'>
        <MenuContext.Provider value={{ openMenu, setOpenMenu, sharePopup, setSharePopup }}>
          {<DocumentGrid loading={loading} error={error} data={data} />}
          <ShareDocument />
        </MenuContext.Provider>
      </section>
    </div>
  )
}
