import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../slices/authSlice'

const register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password === password_confirmation && name && email && password) {
            setLoading(true)

            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://authentication-pramod.herokuapp.com/api/user/register',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation,
                        "tc": true

                    })
                })
                if (response.status === 200) {
                    const token = response.data.token
                    dispatch(login({ email, token }))
                    router.push("/dashboard")
                } else if(response.status===409) {
                    setLoading(false)
                    alert("server problem")
                }
                console.log(response)
            } catch (err) {
                console.log(err)
            }

        } else {
            alert("Error")
        }


    }
    return (
        <div className="bg-mybg bg-cover bg-no-repeat min-h-full p-5 sm:p-5 md:p-10  min-h-[100vh] ">
            <Head>
                <title>Register</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <form onSubmit={(e) => submitHandler(e)} className='sm:w-[90%] rounded-xl bg-white  min-h-[88vh] max-w-xs max-w-xs  sm:max-w-sm md:max-w-md lg:max-w-lg flex flex-col  mx-auto p-4'>
                <h1 className='text-center text-[2rem] text-black'>Register</h1>
                <label className='mt-10'>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 p-2 rounded border-gray-300 border-2 outline-none "
                />
                <label className='mt-10'>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 p-2 rounded border-gray-300 border-2 outline-none "
                />
                <label className='mt-10'>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 rounded border-gray-300 border-2 outline-none " />

                <label className='mt-10'>Confirm Password</label>
                <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    className="mt-2 p-2 rounded border-gray-300 border-2 outline-none "
                />

                <button disabled={loading} className='cursor-pointer min-w-[50%] bg-gradient-to-r from-purple-500 to-pink-500 mt-10 px-4 py-2 text-white self-center rounded-3xl'>{loading ? "wait..." : "Register"}</button>
                <p className='text-center text-blue-800 mt-5 font-semibold'>
                    <Link href="/">Click here to Login</Link>
                </p>
            </form>
        </div>
    )
}

export default register
