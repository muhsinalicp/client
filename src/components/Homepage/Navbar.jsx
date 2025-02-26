import { CircleUserRoundIcon, LucideShoppingCart, Menu } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignModal from '../signing/SignModal'
import Sidebar from './Sidebar'
import { AuthContext } from '../../context/context'



function Navbar() {

    const auth = useContext(AuthContext)
    
    const [open, setopen] = useState(false)
    const [sidebar, setsidebar] = useState(false)
    const nav = useNavigate()

    return (
        <div className='p-5  h-full flex justify-between items-center'>
            <div className='hover:cursor-pointer'>
                <h1 className='text-3xl head-font '>
                    Cart-Hive
                </h1>
            </div>



            <div className='hidden lg:flex '>
                <ul className='flex gap-4  h-full tracking-wider'>
                    <li className='hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600'>
                        Home
                    </li>
                    <li className=' hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600'>
                        About
                    </li>
                    <li className='hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600'>
                        Contact
                    </li>
                </ul>
            </div>

            {auth.isAuth ?
                <div>
                    <div className='lg:hidden'>
                        <Menu onClick={() => setsidebar(!sidebar)} size={30} />
                    </div>
                    <div className=' gap-4 hidden lg:flex'>
                        <LucideShoppingCart className='hover:cursor-pointer  lg:hover:transform hover:scale-110' size={30} />
                        <CircleUserRoundIcon onClick={() => setsidebar(!sidebar)} className='hover:cursor-pointer lg:hover:transform hover:scale-110 ' size={30} />
                    </div>

                </div>
                :
                <div className=' gap-1 flex '>
                    <button onClick={() => nav('/signup')} className='bg-black text-white px-3 py-2 lg:px-8 lg:py-2 rounded-4xl w-fit text-sm hover:cursor-pointer hover:transform hover:scale-102'>Sign Up</button>
                    <button onClick={() => setopen(!open)} className='bg-neutral-600 text-white px-3 py-2 lg:px-8 lg:py-2 rounded-4xl hover:cursor-pointer hover:transform hover:scale-102'>Sign In</button>
                </div>}

            {open && <SignModal setOpen={setopen} />}
            {sidebar && <Sidebar sidebar={sidebar} setsidebar={setsidebar} />}
        </div>
    )
}

export default Navbar