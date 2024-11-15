import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  justify-center">
        <div className="flex items-center justify-center p-5 mt-[120px]">
          <div className="grid grid-cols-6 grid-rows-5 gap-4 w-full">
            <div className="col-span-1 row-span-5 h-[75vh] bg-[#1a1a1a] rounded-md p-2">item1</div>
            <div className="col-span-5 row-span-5 h-[75vh] bg-[#1a1a1a] rounded-md p-2 overflow-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
