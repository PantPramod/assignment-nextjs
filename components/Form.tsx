import axios from 'axios'
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { employee } from '../pages/dashboard'
import { tokenValue } from '../slices/authSlice'

type propType = {
    close: () => void,
    setFlag: Dispatch<SetStateAction<boolean>>,
    id?: string,
    type: string,
    emp?: employee | null
}

const Form = ({ close, setFlag, id, type, emp }: propType) => {

    const [username, setUsername] = useState(type === "edit" ? emp?.username : "")
    const [email, setEmail] = useState(type === "edit" ? emp?.email : "")
    const [phoneno, setPhoneno] = useState(type === "edit" ? emp?.phoneno : "")
    const [company, setCompany] = useState(type === "edit" ? emp?.company : "")
    const token = useSelector(tokenValue)


    const updateHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'patch',
                url: `https://authentication-pramod.herokuapp.com/api/employee/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    email,
                    username,
                    phoneno,
                    company
                })
            })
            if (response.status === 204) {
                alert("updated successfully")
                setFlag((flag) => !flag)
                close();
            }
        } catch (err) {
            console.log(err)
        }
    }



    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const response = await axios({
            method: 'post',
            url: 'https://authentication-pramod.herokuapp.com/api/employee/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ username, email, phoneno, company })
        })

        console.log(response)

        if (response.status === 200) {
            setFlag((prev) => !prev)
            close();
        }

    }

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-transparent flex justify-center items-center'>
            <form
                onSubmit={(e) => { type === "create" ? submitHandler(e) : updateHandler(e) }}
                className="mx-auto w-[40%] shadow-lg shadow-[rgb(73,83,83)] p-8 flex flex-col bg-white max-w-2xl rounded-lg"
            >
                <AiOutlineClose
                    cursor="pointer"
                    className='ml-auto'
                    size={25}
                    onClick={() => close()} />
                <h1 className='font-semibold text-center text-3xl'>Add New Record</h1>
                <input
                    type="text"
                    placeholder='user name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded outline-none full-width m-5 p-2 border-2 border-[rgba(185,170,170,0.53)]"
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded outline-none full-width m-5 p-2 border-2 border-[rgba(185,170,170,0.53)]"
                />
                <input
                    type="text"
                    placeholder='phone no'
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    className="rounded outline-none full-width m-5 p-2 border-2 border-[rgba(185,170,170,0.53)]"
                />
                <input
                    type="text"
                    placeholder='company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="rounded outline-none full-width m-5 p-2 border-2 border-[rgba(185,170,170,0.53)]"
                />
                <button
                    className='m-5 self-center px-5 py-2 rounded border-2 border-[rgba(170,157,157,0.75)]'
                >
                    Submit
                </button>


            </form>
        </div>
    )
}

export default Form
