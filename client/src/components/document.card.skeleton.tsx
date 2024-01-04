export default function DocumentCardSkeleton() {
    return (
      <form
        className='rounded-md rounded-b-none max-w-full max-h-full h-full w-full mt-10 flex flex-col text-sm text-clip text-black bg-gray-50 select-none overflow-hidden border '
      >
        <div className='flex-1 overflow-hidden relative'>
          <img
            className='object-cover w-full rounded rounded-b-none h-full animate-[pulse_1s_linear_infinite] bg-gray-300 hover:opacity-50 cursor-pointer'
            src={"//:0"}
            onError={(event: any) => {
                event.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'></svg>`
              }}
          />
        </div>
  
        <div className={`flex-3 flex justify-between items-center p-2 gap-4 animate-[pulse_1s_linear_infinite]`}>
          <span className='rounded w-full h-full overflow-hidden p-2 text-ellipsis whitespace-nowrap cursor-pointer bg-gray-300'></span>
          <span className={`rounded bg-gray-300 p-2 self-end cursor-pointer border-l  `}></span>
        </div>
      </form>
    )
  }