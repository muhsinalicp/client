import { Star } from 'lucide-react'
import React , { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Topsellpage() {
    const nav = useNavigate();
    const [data, setdata] = useState([]);


    useEffect(() => 
    {

      const fetchdata =async()=>
      {
        try
        {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}home`);
          setdata(res.data.data);       
        }
        catch(err)
        {
          console.log(err);
        }}

        fetchdata();

    }, [])
  return (
    <div className='h-full w-full'>
    <div className=' w-full flex justify-center items-center text-4xl pt-5 head-font'>
        TOP SELLINGS
    </div>
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-5 lg:px-20 '>

                {data.map((item) => 
                    (
                        <div onClick={() => nav(`/product/${item._id}`)} key={item._id} className='flex flex-col  items-center hover:transform hover:scale-102 duration-200 hover:shadow-sm rounded-2xl p-2 cursor-pointer  '>
                            <div className='w-full  flex flex-col justify-center items-center rounded-3xl'>

                              <div className='bg-[#F2F0F1] w-full h-40 lg:h-80 rounded-2xl   flex items-center justify-center'>
                                <img className='w-full h-3/4 object-contain drop-shadow-2xl rounded-2xl' src={item.image} alt="" />
                              </div>

                              <div className='flex flex-col justify-start w-full py-3 px-2'>
                                <span className='font-semibold text-xl lg:text-2xl'>
                                    {item.productname}
                                </span>

                                <span className='flex gap-1 items-center'>
                                    <Star className='text-yellow-400' fill='gold' size={20}/>
                                    <Star className='text-yellow-400' fill='gold' size={20}/>
                                    <Star className='text-yellow-400' fill='gold' size={20}/>
                                    <Star className='text-yellow-400' fill='gold' size={20}/>
                                    <span className='text-gray-500'>4/5</span>
                                </span>

                                <span className='font-semibold text-lg lg:text-xl'>
                                    Rs. {item.productprice}
                                </span>

                              </div>
                            </div>
                        </div>
                    ))}

    </div>

    <div className='w-full flex justify-center items-center py-5'>
        <button className=' outline-1 outline-gray-400 px-14 py-2 rounded-4xl hover:bg-gray-200 hover:cursor-pointer'>View All</button>
    </div>
</div>
  )
}

export default Topsellpage