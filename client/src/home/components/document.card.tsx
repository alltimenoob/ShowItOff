import { useContext } from "react"
import { Document, MenuContext } from "../home"

enum MenuItems {
  Edit = "/edit.png",
  Share = "/share.png",
  Delete = "/trash.png",
}

export default function DocumentCard({ document }: { document: Document }) {
  const menuContext = useContext(MenuContext)
  if (menuContext == null) return

  const { openMenu, setOpenMenu, setMenuItem } = menuContext

  const handleMenuClick = (currentMenuItem: MenuItems) => () => {
    if (currentMenuItem == MenuItems.Share) setMenuItem((prevState)=> {
      return {...prevState,share:true}
    })
    if (currentMenuItem == MenuItems.Delete) setMenuItem((prevState)=> {
      return {...prevState,delete:true}
    })
    if (currentMenuItem == MenuItems.Edit) setMenuItem((prevState)=> {
      return {...prevState,edit:true}
    })
  }

  const handleLoadPopup = (document: Document) => () => {
    if (openMenu && openMenu.title == document.title) setOpenMenu({
      id: '',
      title : '', 
      preview : '',
      filename : ''
    })
    else setOpenMenu(document)
  }

  return (
    <form
      key={document.title}
      className='rounded-md rounded-b-none max-w-full max-h-full h-full w-full mt-10 flex flex-col text-sm text-clip text-black  select-none overflow-hidden border '
    >
      <div className='flex-1 overflow-hidden relative'>
        <img
          className={`object-cover w-full rounded rounded-b-none h-full bg-gray-300 ${
            openMenu && openMenu.title === document.title ? "" : "hover:opacity-50"
          }
           cursor-pointer`}
          src={document.preview}
          onError={(event: React.BaseSyntheticEvent) => {
            event.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'></svg>`
          }}
        />

        <div
          className={`${
            openMenu && openMenu.title == document.title ? "animate-menuOpen" : " hidden"
          }  overflow-hidden w-[3rem] h-[10rem] flex flex-col absolute bottom-3 right-1 `}
        >
          {(Object.keys(MenuItems) as Array<keyof typeof MenuItems>).map((menuItem, index) => (
            <img
              src={MenuItems[menuItem]}
              key={index}
              className='m-auto p-3 object-contain border-b hover:bg-blue-300 rounded-[5rem] cursor-pointer text-black text-base bg-blue-100 '
              onClick={handleMenuClick(MenuItems[menuItem])}
            />
          ))}
        </div>
      </div>

      <div className={`flex-2 flex justify-between items-center`}>
        <span
          className={`rounded rounded-b-none w-full overflow-hidden p-2 text-ellipsis whitespace-nowrap cursor-pointer hover:bg-gray-100 
           border-gray-400`}
        >
          {document.title} 
        </span>

        <span
          className={`p-2 self-end cursor-pointer border-l  hover:bg-gray-100 `}
          onClick={handleLoadPopup(document)}
        >
          :
        </span>
      </div>
    </form>
  )
}
