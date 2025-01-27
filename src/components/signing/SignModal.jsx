import React from 'react'

function SignModal({ setOpen }) {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-60'>
            <div
                className='fixed inset-0 bg-black opacity-50'
                onClick={() => setOpen(false)}
            ></div>

            <div className='bg-black rounded-lg shadow-lg pb-10 w-3/4 px-6 md:w-[40%] h-fit z-[51] relative text-white   '>

                <button
                    className='absolute top-3 right-4 text-2xl text-gray-100 hover:text-red-500'
                    onClick={() => setOpen(false)}
                >
                    ✕
                </button>

                <h1 className='text-2xl text-white pt-8 font-bold text-center'>SignIn</h1> 
                <form className=''>
                    <div className='mb-2'>
                        <label className='block text-xl font-medium '>Email</label>
                        <input
                            type='email'
                            className='w-full px-3 py-2 border text-black bg-white rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring focus:border-blue-500'
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-xl font-medium '>Password</label>
                        <input
                            type='password'
                            className='w-full px-3 py-2 border  text-black bg-white rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring focus:border-blue-500'
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className='mt-6'>
                                            <button
                        type='submit'
                        className='w-full bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200'
                    >
                        Sign In
                    </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignModal