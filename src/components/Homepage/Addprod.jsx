import React from 'react'

function Addprod() {

    return (
        <div className='w-screen h-screen bg-gray-200 flex justify-center items-center '>
            
            <div className='bg-gray-600 w-[90%] h-[90%] p-2 flex flex-col rounded-2xl'>
                <div>
                <h1 className='p-3 text-center head-font text-2xl'>ADD PRODUCTS</h1>

                </div>
                <div className='grid grid-cols-2 p-5  h-full'>
                    <div className=''>
                        
                    </div>

                    <div className='flex flex-col gap-4 justify-center'>

                    <form >
                    <div className='flex flex-col gap-2'>
                            <label className='font-bold text-white' htmlFor="image">Upload an main Image of the Product: </label>
                            <input className='bg-white p-2 rounded-2xl' type="file" name="" id="image" accept='image/*'/>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-white' htmlFor="image">Upload additional Images of the Product: </label>
                            <input className='bg-white p-2 rounded-2xl' type="file" name="" id="image" multiple accept='image/*' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-white' htmlFor="name">Product Name:</label>
                            <input className='bg-white p-2 rounded-2xl' type="text" name="" id="name" placeholder='Enter the Product Name' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-white' htmlFor="desc">Product Description:</label>
                            <textarea rows={6} className='bg-white p-2 rounded-2xl' type="text" name="" id="desc" placeholder='Enter the product Description' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-white' htmlFor="price">Product Price:</label>
                            <input className='bg-white p-2 rounded-2xl' type="text" name="" id="price" placeholder='Enter product Price' />
                        </div>

                        <div className='flex mt-5'>
                        <button className='bg-white flex-1 p-2 rounded-xl font-bold'>Submit Product</button>
                        </div>

                    </form>



                    </div>
                </div>

            </div>

            
        </div>
    )
}

export default Addprod