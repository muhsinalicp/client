import React from 'react'
import levis from '../../assets/logos/levis.png'
import kappa from '../../assets/logos/kappa.png'
import hm from '../../assets/logos/hm.png'
import pantaloons from '../../assets/logos/pantaloons.png'
import puma from '../../assets/logos/puma.png'
import raymond from '../../assets/logos/raymond.png'




function Promotion() {

    const brands = [
    {
        id: 1,
        name: "Levis",
        img: levis
    },
    {
        id: 2,
        name: "Kappa",
        img: kappa
    },
    {
        id: 3,
        name: "H&M",
        img: hm
    },
    {
        id: 4,
        name: "Pantaloons",
        img: pantaloons
    },
    {
        id: 5,
        name: "Puma",
        img: puma
    },
    {
        id: 6,
        name: "Raymond",
        img: raymond
    },
        
    ]


  return (
    <div className='h-full w-full bg-neutral-950 flex justify-center items-center'>
        <div className='h-full w-full flex justify-center lg:gap-20 items-center flex-wrap'>
            {brands.map((item) => 
            (
                <>
                <img key={item.id} className=' h-12 drop-shadow-xs' src={item.img} alt={item.name} />
                </>
            ))}
        </div>
    </div>
  )
}

export default Promotion