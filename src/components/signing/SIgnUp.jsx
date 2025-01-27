import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SIgnUp() {
  const nav = useNavigate();
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-200'>
      <div className='w-[95%] lg:w-[40%] h-[90%] bg-black relative flex flex-col justify-between items-center'>
        <h1 className='text-3xl font-bold text-white p-4 text-center'>SignUp</h1>
        <button onClick={() => nav(-1)} className='text-white text-2xl absolute top-5 left-6 font-bold hover:transform hover:scale-110 duration-200'>
          <ArrowLeft />
        </button>
        <form className='w-full h-full flex flex-col items-center p-3' >
          <label className='text-2xl px-3 w-3/4 text-left font-bold text-white'>Name</label>
          <input
            className='bg-white p-2 rounded-xl w-3/4'
            type="text"
            placeholder="Enter Your Name"
            // onChange={(e) => setname(e.target.value)}
            required />

          <label className='text-2xl px-3 w-3/4 text-left mt-4 font-bold text-white'>Email</label>
          <input type='email'
            className='bg-white p-2 rounded-xl w-3/4'
            placeholder="Enter Your Email"
            // onChange={(e) => setemail(e.target.value)}
            required />

          <label className='text-2xl px-3 w-3/4  mt-4 text-left font-bold text-white'>Phone</label>
          <input type="text"
            className='bg-white p-2 rounded-xl w-3/4'
            placeholder="Enter Your Phone Number"
            // onChange={(e) => setphone(e.target.value)}
            required />

          <label className='text-2xl px-3 w-3/4 text-left font-bold text-white  mt-4'>Address</label>
          <textarea
            id="address"
            placeholder="Enter Your Address"
            name="address"
            className='bg-white p-2 rounded-xl w-3/4'
            // onChange={(e) => setaddress(e.target.value)}
            required
          ></textarea>

          <label className='text-2xl px-3 w-3/4 text-left font-bold text-white  mt-4'>Username</label>
          <input type="text"
            className='bg-white p-2 rounded-xl w-3/4'
            placeholder="Create a Username"
            // onChange={(e) => setusername(e.target.value)}
            required />

          <label className='text-2xl px-3 w-3/4 text-left font-bold  mt-4 text-white'>Password</label>
          <input type="password"
            className='bg-white p-2 rounded-xl w-3/4'
            placeholder="Create a Password"
            // onChange={(e) => setpassword(e.target.value)}
            required />

          <label className='text-2xl px-3 w-3/4 text-left font-bold text-white  mt-4'>Profile Image</label>
          <input
            className='bg-white p-2 rounded-xl w-3/4'
            type="file"
            placeholder='upload your image'
            name="image"
            accept="image/*"
            // onChange={(e) => setimage(e.target.files[0])}
            required />


          <button className='text-lg  tracking-wider p-1 rounded-2xl font-bold text-black text-center bg-white  mt-4 w-3/4' type='submit'>
            Sign Up
            <div className="arrow-wrapper">
              <div className="arrow"></div>

            </div>
          </button>
        </form>

      </div>
    </div>
  )
}

export default SIgnUp