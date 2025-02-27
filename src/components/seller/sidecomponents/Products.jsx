import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Products() {
    const nav = useNavigate();

    const [products, setproducts] = useState([]);



    useEffect(()=>
      {
        const fetchdata =async()=>
          {
            try
            {
              const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}seller/products`,{withCredentials:true});
              setproducts(res.data.data);

            }
            catch(err)
            {

            }
          }

          fetchdata();
      }
    ,[])

  if (products.length === 0) {

    

    return(
        <div className='w-full h-full flex justify-between p-2'>
            <div className='flex gap-2 h-fit items-center'>
                <h1 className='text-2xl font-bold'>Your Products:</h1>
                <Loader2 className='animate-spin'/>
            </div>
        </div>
    )
    
  }

  return (
    <div className='w-full h-full flex  flex-col p-2 gap-4'>
      <div className='flex gap-2 h-fit w-full justify-between'>
      <div className=''>
            <h1 className='text-2xl font-bold'>Your Products:</h1>
        </div>

        <div>
            <button 
            onClick={() => nav('/sellerhome/products/addproduct')}
            className='bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800'>Add Product</button>
        </div>
      </div>

      <div className=' w-full h-full p-4'>
          <div className='grid grid-cols-4 gap-4'>

            {products.map((prod)=>
            (
                <div key={prod._id} className='flex flex-col gap-2  rounded-lg h-96 p-4 bg-white '>

                  <img src={prod.image[0]} className='w-full h-1/2 object-contain' loading='lazy' alt={prod.productname} />
                  <div className='font-bold text-center first-letter:uppercase text-xl'>{prod.productname}</div>
                  <div className='font-bold text-center'>₹ {prod.productprice}</div>

                  <button className='bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800'>view</button>
                  <button className='bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800'>edit</button>
                </div>
            )
            )}

          </div>
      </div>

    </div>
  )
}

export default Products