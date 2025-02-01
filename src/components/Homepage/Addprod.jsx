import axios from 'axios';
import React, { useState } from 'react';

function Addprod() {
    const [data, setdata] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: '',
        additionalImages: [],
    });

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');

    const handleInputChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            if (e.target.name === "image") {
                setdata({ ...data, image: e.target.files[0] });
            } else {
                setdata({ ...data, additionalImages: [...e.target.files] });
            }
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productname', data.name);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('image', data.image);

        data.additionalImages.forEach((file, index) => {
            formData.append(`additionalImages[${index}]`, file);
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}submitproduct`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(res.data);


            if (res.data.status === 'done') {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-screen h-screen bg-gray-200 flex justify-center items-center '>
            <div className='bg-gray-600 w-[90%] h-[90%] p-2 flex flex-col rounded-2xl'>
                <div>
                    <h1 className='p-3 text-center head-font text-2xl'>ADD PRODUCTS</h1>
                </div>
                <div className='grid grid-cols-2 p-5  h-full'>
                    <div></div>

                    <div className='flex flex-col gap-4 justify-center'>
                        <form onSubmit={handlesubmit}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white after:content-["*"] after:text-red-400 after:ml-1' htmlFor="image">Upload a main Image of the Product:</label>
                                <input className='bg-white p-2 rounded-2xl' onChange={handleImageChange} type="file" name="image" id="image" accept='image/*' required />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white' htmlFor="additionalImages">Upload additional Images of the Product:</label>
                                <input className='bg-white p-2 rounded-2xl' onChange={handleImageChange} type="file" name="additionalImages" id="additionalImages" multiple accept='image/*' />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white after:content-["*"] after:text-red-400 after:ml-1' htmlFor="name">Product Name:</label>
                                <input className='bg-white p-2 rounded-2xl' onChange={handleInputChange} type="text" name="name" id="name" placeholder='Enter the Product Name' required/>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white after:content-["*"] after:text-red-400 after:ml-1' htmlFor="description">Product Description:</label>
                                <textarea rows={6} className='bg-white p-2 rounded-2xl ' onChange={handleInputChange} name="description" id="description" placeholder='Enter the product Description' required />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white after:content-["*"] after:text-red-400 after:ml-1' htmlFor="description">Product Category:</label>
                                <select className='bg-white p-3 rounded-2xl ' value={data.category} onChange={handleInputChange} name="category" id="category"  required>
                                    <option value="Casual">Casual</option>
                                    <option value="Formal">Formal</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Party">Party</option>
                                    <option value="Gym">Gym</option>
                                    <option value="Daily Wear">Daily Wear</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='font-bold text-white after:content-["*"] after:text-red-400 after:ml-1' htmlFor="price">Product Price:</label>
                                <input className='bg-white p-2 rounded-2xl' onChange={handleInputChange} type="text" name="price" id="price" placeholder='Enter product Price' disabled={loading} required />
                            </div>

                            <div className='flex mt-5'>
                                <button type='submit' className='bg-white flex-1 p-2 rounded-xl font-bold'>{loading ? 'Loading...' : 'Submit Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addprod;
