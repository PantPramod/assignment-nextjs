import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type propType = {
    submitHandler: (company: string) => Promise<void>,
    close: () => void
}

const FilterBox = ({ submitHandler, close }: propType) => {
    const [companyName, setCompanyName] = useState('')
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-transparent flex items-center justify-center min-h-[100vh]'>
            <div className='p-5 rounde-3xl bg-white  shadow-lg shadow-[rgb(73,83,83)]'>
                <AiOutlineClose
                    cursor="pointer"
                    className='ml-auto'
                    size={25}
                    onClick={() => close()} />
                <p className='p-5 font-bold cursor-pointer'>Company</p>
                <p className='px-5 py-1 bold hover:font-bold cursor-pointer' onClick={()=>setCompanyName("Mars")}>Mars</p>
                <p className='px-5 py-1 bold hover:font-bold cursor-pointer' onClick={()=>setCompanyName("Earth")}>Earth</p>
                <p className='px-5 py-1 bold hover:font-bold cursor-pointer' onClick={()=>setCompanyName("Venus")}>Venus</p>
                <input className='rounded m-5 p-2 outline-none border-[1px] border-gray-400' value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder='company name' />
                <br/>
                <p 
                className='cursor-pointer rounded-2xl m-5 text-center p-2  border-[1px] border-gray-400 ' 
                onClick={()=>submitHandler(companyName)}>Apply</p>
            </div>
        </div>
    )
}

export default FilterBox
