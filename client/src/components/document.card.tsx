export default function DocumentCard({ document }: any) {
  return (
    <form
      key={document ? document.title : Date.now() + Math.random()}
      className='rounded-md rounded-b-none max-w-full max-h-full h-full w-full mt-10 flex flex-col text-sm text-clip text-black bg-gray-50 select-none overflow-hidden border '
    >
      <div className='flex-1 overflow-hidden'>
        <img
          className={`object-cover w-full rounded rounded-b-none h-full bg-gray-300 ${
            !document ? "animate-[pulse_1s_linear_infinite]" : ""
          }  hover:opacity-50 `}
          src={document ? document.preview : "//:0"}
          onError={(event: any) => {
            event.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'></svg>`
          }}
        />
        :
      </div>
      <div className={`flex-2 flex justify-between items-center  ${!document ? "p-2" : ""}`}>
        <span
          className={`rounded rounded-b-none w-full overflow-hidden p-2 text-ellipsis whitespace-nowrap cursor-pointer hover:bg-gray-100 ${
            !document ? "animate-[pulse_1s_linear_infinite] bg-gray-300 border-gray-400" : ""
          }`}
        >
          {document ? document.title : " "}
        </span>
        <span className={` p-2 self-end cursor-pointer border-l  hover:bg-gray-100 `}>
          {" "}
          {document ? ":" : ""}
        </span>
      </div>
    </form>
  )
}
