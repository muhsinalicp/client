import React, { useEffect, useState } from 'react'
import Navbar from '../Homepage/Navbar'
import { Minus, Plus, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {

    const [product, setproduct] = useState();
    const [count, setcount] = useState(1);
    const {id} = useParams();
    const [selectedImage, setselectedImage] = useState();


    useEffect(()=>
        {

            const fetchdata = async()=>
            {
                try
                {
                    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}product/${id}`);
                    console.log(res.data.data);
                    setproduct(res.data.data);
                    setselectedImage(res.data.data.image[0]);
                }
                catch(err)
                {
                    console.log(err);
                }
            }

            fetchdata();

        },[id])

    function handlecount(type)
    {
        if(type === 'plus')
        {
            setcount(count + 1);
        }
        else
        {
            if(count > 1)
            {
                setcount(count - 1);
            }
        }
    }



    return (
        <div className='h-fit md:h-[84vh] w-screen flex flex-col  overflow-hidden'>
            <div>
                <Navbar />
            </div>

            <div className='flex flex-col md:flex-row w-full h-full  justify-between p-2 md:p-8  '>

                {/* image section  */}
                <div className='flex flex-1 gap-3   max-w-full flex-col-reverse md:flex-row p-2'>

                    {/* select image section  */}
                    <div className="h-full flex md:flex-col overflow-x-auto scrollbar-hidden gap-3">
                        {product?.image.map((item) => 
                        (
                            <div className="flex-shrink-0 w-[80px] h-[80px] md:w-36 md:h-36 bg-[#F2F0F1] rounded-2xl flex items-center justify-center">
                                <img src={item} className='w-1/2 h-1/2' alt="" />
                            </div>
                        ))}
                    </div>

                    {/* selected image section  */}
                    <div>
                        <div className='bg-[#F2F0F1] w-full h-full md:w-[540px] md:h-[580px] rounded-2xl flex items-center justify-center'>
                            <img src={selectedImage} className='w-3/4 h-3/4 object-fill' alt="" />
                        </div>
                    </div>
                </div>

                {/* description section  */}
                <div className='flex  py-4  w-full   md:py-12 px-4'>

                    <div className='flex flex-col w-full gap-6'>
                        {/* product title  */}
                        <h1 className='uppercase head-font text-lg  md:text-4xl'>
                            {product?.productname}
                        </h1>

                        {/* rating  */}
                        <span className='flex gap-1'>
                            <Star fill='gold' size={30} className='text-yellow-400' />
                            <Star fill='gold' size={30} className='text-yellow-400' />
                            <Star fill='gold' size={30} className='text-yellow-400' />
                            <Star fill='gold' size={30} className='text-yellow-400' />
                        </span>

                        <span className='md:w-3/4 text-xs'>
                            {product?.description}
                        </span>

                        <span className='font-extrabold head-font text-lg lg:text-3xl'>
                            ₹ {product?.productprice}
                        </span>

                        <div className='w-full h-fit flex flex-col md:flex-row gap-2 md:gap-12'>
                            <span className='py-3 rounded-2xl bg-zinc-100 flex items-center flex-1  justify-between gap-2 px-4'>
                                <button className='text-2xl' onClick={() => handlecount('minus')}  ><Minus/></button>
                                <h1 className='font-bold'>{count}</h1>
                                <button className='text-2xl' onClick={() => handlecount('plus')} ><Plus/></button>
                            </span>
                            <span className='h-full py-3 rounded-2xl bg-black text-white flex-1 flex items-center justify-center cursor-pointer px-12'>Add To Cart</span>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default ProductDetail