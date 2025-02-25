import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Products() {
    const nav = useNavigate();


    useEffect(()=>
      {
        const fetchdata =async()=>
          {
            try
            {
              const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}seller/products`,{withCredentials:true});
              console.log(res);
            }
            catch(err)
            {

            }
          }

          fetchdata();
      }
    ,[])


  return (
    <div className='w-full h-full flex justify-between p-2'>
        <div className=''>
            <h1 className='text-2xl font-bold'>Your Products:</h1>
        </div>

        <div>
            <button 
            onClick={() => nav('/sellerhome/products/addproduct')}
            className='bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800'>Add Product</button>
        </div>
    </div>
  )
}

export default Products