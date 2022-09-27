import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { login } from '../slices/authSlice'
import Link from 'next/link'
// import { decrement, increment, selectValue } from '../slices/counterSlice'

const Home: NextPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  // const count = useSelector(selectValue)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios({
        method: 'post',
        url: 'https://authentication-pramod.herokuapp.com/api/user/login',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          email, password
        })
      })
      console.log(response.data)

      if (response.data.status === 'Success') {
        const token = response.data.token
        dispatch(login({ email, token }))
        router.push('/dashboard');
        setLoading(false);
      }
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className="bg-mybg bg-cover bg-no-repeat min-h-full p-5 sm:p-5 md:p-10  min-h-[100vh] ">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        onSubmit={(e) => submitHandler(e)} className='sm:w-[90%] rounded-xl bg-white  h-[88vh] sm:max-w-sm md:max-w-md lg:max-w-lg flex flex-col  mx-auto p-4'>
        <h1 className='text-center text-[2rem] text-black'>Login</h1>
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

        <button disabled={loading} className='cursor-pointer min-w-[50%] bg-gradient-to-r from-purple-500 to-pink-500 mt-10 px-4 py-2 text-white self-center rounded-3xl'>{loading ? "wait..." : "Login"}</button>
        <p className='text-center text-blue-800 mt-5 font-semibold'><Link href="/register">Click here to register</Link></p>
      </form>
    </div>
  )
}

export default Home
