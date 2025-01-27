import React from 'react'
import casual from '../../assets/casual.png'
import formal from '../../assets/formal.png'
import party from '../../assets/party.png'
import sports from '../../assets/sports.png'
import gym from '../../assets/gym.png'
import dailywear from '../../assets/dailywear.png'

function BrowseCat() {

    const categories = 
    [
        {
            id:1,
            type:"Casual",
            img:casual
        },
        {
            id:2,
            type:"Formal",
            img:formal
        },
        {
            id:3,
            type:"Sports",
            img:sports
        },
        {
            id:4,
            type:"Party",
            img:party
        },
        {
            id:5,
            type:"Gym",
            img:gym
        },
        {
            id:6,
            type:"Daily Wear",
            img:dailywear
        },
    ]

  return (
    <div className='h-full w-full py-5 px-5 lg:px-15'>
        <div className='h-full w-full bg-[#F2F0F1] px-4 lg:px-8 py-12 rounded-2xl'>

            <div className=' w-full flex justify-center items-center text-2xl lg:text-4xl py-12 head-font'>
                BROWSE BY CATEGORY
            </div>
            <div  className='grid grid-cols-1 lg:grid-cols-3 gap-3 h-fit w-full '>

            {categories.map((item) => 
            (
                <div key={item.id} className='flex h-[180px]  bg-white items-center rounded-2xl col-  '>
                    <div className='px-8 text-2xl'>{item.type}</div>
                    <div className='w-full h-full  flex flex-col justify-center items-end ml-30   overflow-hidden '>
                        <img className='h-96 '  src={item.img} alt={item.type} />
                    </div>
                </div>
                    
            ))}
                </div>




        </div>
    </div>
  )
}

export default BrowseCat