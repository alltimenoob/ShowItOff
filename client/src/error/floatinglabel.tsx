import { LayoutRouteProps } from "react-router-dom"

export default function FloatingLabel(props: LayoutRouteProps) {
  return (
    <div className='absolute bg-red-400 p-5 rounded-lg z-10 text-white bottom-5 right-5 animate-slideOutFloatingLabel flex justify-center items-center'>
      <span className='text-sm lg:text-base'>{props.children}</span>
    </div>
  )
}
