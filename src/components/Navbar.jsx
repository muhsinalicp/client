import { CircleUserRoundIcon, LucideShoppingCart } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const nav = useNavigate()
    return (
        <div className='p-5  h-full flex justify-between items-center'>
            <div className='hover:cursor-pointer'>
                <h1 className='text-3xl head-font '>
                    Cart-Hive
                </h1>
            </div>

            <div>
                <ul className='flex gap-4  h-full'>
                    <li onClick={() => nav('/signup')} className='hover:cursor-pointer active:text-sky-600'>
                        Home
                    </li>
                    <li  className='hover:cursor-pointer active:text-sky-600'>
                        About
                    </li>
                    <li className='hover:cursor-pointer active:text-sky-600'>
                        Contact
                    </li>
                </ul>
            </div>

            <div className='flex gap-4'>
                <LucideShoppingCart className='hover:cursor-pointer  lg:hover:transform hover:scale-110' size={30}/>
                <CircleUserRoundIcon className='hover:cursor-pointer lg:hover:transform hover:scale-110 ' size={30}/>
            </div>
        </div>
    )
}

export default Navbar