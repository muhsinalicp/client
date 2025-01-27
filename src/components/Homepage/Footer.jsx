import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const nav = useNavigate();
  return (
    <div className='w-full lg:h-full h-fit  relative '>
      <div className='mx-auto bg-black w-3/4 py-8 px-8 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-4 relative  z-50'>

        <div className='text-white head-font text-3xl flex items-center'>
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </div>

        <div className='text-white w-full h-fit font-bold flex items-end flex-col gap-4'>

          <div className=' h-10 w-full '>
            <div className='h-full w-full flex lg:justify-end relative'>
              <input className='py-3  px-8 4 h-full w-full lg:w-3/4 rounded-xl bg-white text-black placeholder:text-gray-700 absolute' type="email" name="" id="" placeholder='Enter your email address' />
            </div>
            {/* <div className='absolute '> */}
            {/* <LucideMails color='white' className=''/> */}
            {/* </div> */}
          </div>

          <div className=' h-10 w-full flex lg:justify-end'>
            <button className='w-full lg:w-3/4 cursor-pointer bg-white text-black rounded-2xl' type="submit">Subscribe to Cart-hive</button>
          </div>

        </div>

      </div>

      <div className='bg-gray-300 h-fit lg:h-full absolute w-full top-52 lg:top-15  pt-34 p-12 z-0 '>
        <div className='w-full h-full grid grid-cols-2  lg:grid-cols-5 gap-6'>

          <div className='w-full h-full  max-lg:col-span-2'>
            <h1 className='head-font text-2xl '>Cart-hive</h1>
            <p className='text-gray-600 text-sm'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
            <div>
            </div>
          </div>

          <div className='w-full h-full '>
            <h1>COMPANY</h1>
            <ul className='text-neutral-600 font-light mt-5 flex flex-col gap-2 text-sm'>
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
              <li className='cursor-pointer hover:underline w-fit' onClick={()=>nav('/addproduct')} >Add Products</li>
            </ul>
          </div>

          <div className='w-full h-full '>
          <h1>HELP</h1>
          <ul className='text-neutral-600 font-light mt-5 flex flex-col gap-2 text-sm'>
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy & Policy</li>
            </ul>

          </div>

          <div className='w-full h-full '>
          <h1>FAQ</h1>

          <ul className='text-neutral-600 font-light mt-5 flex flex-col gap-2 text-sm'>
              <li>Account</li>
              <li>Manage Delivery</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>


          </div>

          <div className='w-full h-full'>
          <h1>RESOURCES</h1>

          <ul className='text-neutral-600 font-light mt-5 flex flex-col gap-2 text-sm'>
              <li>Free E-Books</li>
              <li>Development Tutorial</li>
              <li>How-to-Blog</li>
              <li>Youtube Playlist</li>
            </ul>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer