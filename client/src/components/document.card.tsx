import { useContext } from "react";
import { MenuContext } from "../home/home";

const contextMenuItems = ["/edit.png", "/share.png", "/trash.png"]

export default function DocumentCard({ document }: any) {

  const {openMenu, setOpenMenu} = useContext(MenuContext);
  return (
    <form
      key={document ? document.title : Date.now() + Math.random()}
      className='rounded-md rounded-b-none max-w-full max-h-full h-full w-full mt-10 flex flex-col text-sm text-clip text-black bg-gray-50 select-none overflow-hidden border '
    >
      <div className='flex-1 overflow-hidden relative'>
        <img
          className={`object-cover w-full rounded rounded-b-none h-full bg-gray-300  ${
            !document ? "animate-[pulse_1s_linear_infinite]" : ""
          }  ${document && openMenu===document.title ? "" : "hover:opacity-50"} cursor-pointer `}
          src={document ? document.preview : "//:0"}
          onError={(event: any) => {
            event.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'></svg>`
          }}
        />
        <div
          className={`${
            document && openMenu===document.title ? "animate-menuOpen" : " hidden"
          }  overflow-hidden w-[3rem] h-[10rem] flex flex-col absolute bottom-3 right-1 `}
        >
          {contextMenuItems.map((menuItem, index) => (
            <img
              src={menuItem}
              key={index}
              className='m-auto p-3 object-contain border-b hover:bg-blue-300 rounded-[5rem] cursor-pointer text-black text-base bg-blue-100 '
              onClick={() => console.log(menuItem + " Clicked")}
            />
          ))}
        </div>
      </div>

      <div className={`flex-2 flex justify-between items-center  ${!document ? "p-2" : ""}`}>
        <span
          className={`rounded rounded-b-none w-full overflow-hidden p-2 text-ellipsis whitespace-nowrap cursor-pointer hover:bg-gray-100 ${
            !document ? "animate-[pulse_1s_linear_infinite] bg-gray-300 border-gray-400" : ""
          }`}
        >
          {document ? document.title : " "}
        </span>

        <span
          className={` p-2 self-end cursor-pointer border-l  hover:bg-gray-100 `}
          onClick={(document)?() => {
            setOpenMenu(document.title)
          }:()=>{}}
        >
          {" "}
          {document ? ":" : ""}
        </span>
      </div>
    </form>
  )
}
