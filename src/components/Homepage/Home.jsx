import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Promotion from './Promotion'
import Arrivalpage from './Arrivalpage'
import Topsellpage from './Topsellpage'
import BrowseCat from './BrowseCat'

function Home() {
    return (

        <div>

            {/* hero section */}
            <div className='h-screen w-screen'>
                <div className='h-[8vh]'>
                    <Navbar />
                </div>

                <div className='h-[80vh] '>
                    <Hero />
                </div>

                <div className='h-[12vh]'>
                    <Promotion />
                </div>
            </div>

        {/* New Arrivals page */}
            <div className='h-fit w-screen py-8 '>
                <Arrivalpage/>
            </div>

        {/* Top Sellings page */}
            <div className='h-fit w-screen py-8 '>
                <Topsellpage/>
            </div>

        {/* browse categories page  */}

        <div className='h-fit w-screen py-8 '>
            <BrowseCat/>
        </div>


        </div>


    )
}

export default Home