import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {

  const [data, setdata] = useState();

  useEffect(()=>
  {

    const fetchdata =async()=>
    {
      try
      {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}seller/dashboard`,{withCredentials:true});
        setdata(res.data);
        console.log('heklo');
        console.log(res);
      }
      catch(err)
      {
        console.log(err);
      }

    }

    fetchdata();

  },[])


  return (
    <div className='w-full h-full '>
        <div className='flex p-2' >
            <h1 className='text-2xl font-bold'>Hello, Dashboard👋</h1>
        </div>
    </div>
  )
}

export default Dashboard