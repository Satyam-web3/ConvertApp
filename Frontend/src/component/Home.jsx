import { useState } from "react"
import React  from 'react'
import axios from "axios"

export default function Home() {

    const[selectedFile, setSelectedFile]=useState(null)
    const handleFile=(e)=>{
        
        setSelectedFile(e.target.files[0])

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const formdata= new FormData()
        formdata.append("file",selectedFile)
        
        try {
           const response= await axios.post("https://convert-app-yjk9.vercel.app//convertfile",formdata,{
                responseType:"blob",
            });
            const url=window.URL.createObjectURL(new Blob([response.data]))
            
            const link=document.createElement("a")
            
            link.href=url;
            link.setAttribute("download",selectedFile.name.replace(/\.[^/.]+$/,"")+".pdf")
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            selectedFile(null)
            
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className='max-w-screnn-2xl mx-auto container px-6 md:px-40 bg-blue-200'>
                <div className='flex h-screen items-center justify-center'>
                    <div className='border-2 border-dashed px-4 py-2 md:px-8 md:py-8 border-indigo-400 rounded-lg shadow-lg bg-blue-400'  >
                        <h1 className='text-3xl font-bold text-center mb-4'>Convert Word to PDF</h1>
                        <p className='mb-5 text-center'>Easily convert your file from word doc to PDF</p>

                        <div className='flex flex-col items-center space-y-4'>
                            <input type='file' 
                            accept='.doc, .docx'
                            onChange={handleFile} 
                            className='hidden' 
                            id='Fileinput' />
                            <label htmlFor='Fileinput' className='w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-400 hover:bg-blue-800 duration-100 hover:text-white'>
                                <span className='text-2xl '>{selectedFile?selectedFile.name:"Choose File"}</span>
                            </label>
                            <button 
                                onClick={handleSubmit}
                                disabled={!selectedFile} 
                                className=' bg-blue-100 hover:bg-blue-600 duration-150 font-bold px-4 py-2 rounded-lg disabled:bg-gray-400'>
                                Convert
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
