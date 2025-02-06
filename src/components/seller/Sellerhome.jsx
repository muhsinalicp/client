import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboardIcon, LogOut, PackageOpenIcon, PiggyBankIcon } from 'lucide-react'
import axios from 'axios';

function Sellerhome() {

  const nav = useNavigate()
  const location = useLocation();

  const handlelogout = async() => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}logout`)
    if (res.data.status === 'success') {
    nav('/');
    }
    else if(res.data.status === 'error')
    {
      alert(res.data.message)
    }
    
  }

  const items = [
    {
      id: 1,
      name: "Dashboard",
      link: "dashboard", // Relative path
      icon: <LayoutDashboardIcon />
    },
    {
      id: 2,
      name: "Products",
      link: "products", // Relative path
      icon: <PackageOpenIcon />
    },
    {
      id: 3,
      name: "Orders",
      link: "orders", // Relative path
      icon: <PiggyBankIcon />
    },
  ];

  return (
    <div className='w-screen h-screen bg-blue-100 flex flex-col  '>

      <div className='w-full h-full flex gap-3'>

        {/* sidebar */}
        <div className='w-xs h-full bg-white outline-1 outline-gray-100 flex flex-col justify-between  gap-2 '>

          <div>
            <div className='w-full h-20 flex justify-center items-center cursor-default'>
              <p className='text-2xl font-bold'>Cart-hive</p>
            </div>

            <div className='p-2 space-y-2'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`w-full flex gap-2 items-center p-3 text-gray-500 hover:bg-purple-950 font-medium hover:text-white cursor-pointer rounded-lg 
                  ${location.pathname === (item.link === "dashboard" ? "/sellerhome" : `/sellerhome/${item.link}`) ? "bg-purple-950 text-white" : ""}`}
                  onClick={() => nav(item.link === "dashboard" ? "/sellerhome" : `/sellerhome/${item.link}`)}  // ✅ FIXED!
                >
                  {item.icon}
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='p-2 outline-1 h-12 outline-gray-100 m-3 flex gap-2 items-center justify-between'>
            <div className='flex gap-2'>
              <div className='size-9 rounded-full bg-amber-100'>

              </div>

              <div className='flex flex-col'>
                <p className='font-bold'>User Name</p>
                <p className='text-xs text-gray-400'>User Name</p>
              </div>
            </div>

            <LogOut onClick={handlelogout} />
          </div>

        </div>

        {/* main content */}
        <div className='w-3/4 h-full  flex flex-col gap-2 rounded-lg py-2'>
        <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Sellerhome