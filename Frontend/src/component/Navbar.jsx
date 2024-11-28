import React from 'react'

export default function Navbar() {
    return (
        <div>
            <div className='bg-blue-600 shadow-lg'>
                <div className='max-w-screnn-2xl mx-auto container px-6 md:px-40 shadow-lg py-4'>


                    <div className='flex justify-between '>
                        <h1 className='text-2xl cursor-pointer font-bold '>Word<span className='text-3xl text-red-500'>TO</span>Pdf</h1>
                        <h1 className='text-2xl cursor-pointer font-bold hover:scale-110 duration-300'>Home</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
