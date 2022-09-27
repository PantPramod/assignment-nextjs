import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  // login,
  //  logout,
  emailValue,
  tokenValue
} from '../slices/authSlice'
import { BsFillBellFill, BsSearch } from 'react-icons/bs'
import { HiHome } from 'react-icons/hi'
import { MdPeople } from 'react-icons/md'
import { AiFillStar, AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { GrFormEdit } from 'react-icons/gr';
import { BsFilterRight } from 'react-icons/bs';
import axios from 'axios'
import Form from '../components/Form'
import FilterBox from '../components/FilterBox'
import Head from 'next/head'

export interface employee {
  _id: string,
  username: string,
  email: string,
  phoneno: string,
  company: string
}

const dashboard = () => {
  const [searchInput, setSearchInput] = useState('')
  const [employees, setEmployees] = useState<employee[]>([])
  const [showAddEmployee, setShowEmployee] = useState(false);
  const [singleEmployee, setSingleEmployee] = useState<null | employee>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showFilterBox, setShowFilterBox] = useState(false)
  const [id, setId] = useState('')
  const [flag, setFlag] = useState(false)
  const [type, setType] = useState('create')
  const email = useSelector(emailValue)
  const token = useSelector(tokenValue)


  // const dispatch = useDispatch()



  const getAllEmployees = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://authentication-pramod.herokuapp.com/api/employee/',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      setEmployees([...response.data.data])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {


    if (token) {
      getAllEmployees();
    }

  }, [flag])


  const deleteEmployee = async (ids: string) => {

    const response = await axios({
      method: 'delete',
      url: `https://authentication-pramod.herokuapp.com/api/employee/${ids}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.data.acknowledged === true) {
      setFlag((prev) => !prev)
    }
  }


  const edit = (uniueId: string, empset: employee) => {
    setSingleEmployee({ ...empset })
    setType("edit")
    setId(uniueId)
    setShowEmployee(true)
  }

  const search = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://authentication-pramod.herokuapp.com/api/employee/',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const searchResult = response.data.data.filter((e: employee) => {
        if (!searchInput) {
          return e
        }
        if (e.company.toLowerCase() === searchInput.toLowerCase() || e.email.toLowerCase() === searchInput.toLowerCase() || e.username.toLowerCase() === searchInput.toLowerCase())
          return e
      })
      setEmployees([...searchResult])
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const filterApply = async (company: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://authentication-pramod.herokuapp.com/api/employee/',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const searchResult = response.data.data.filter((e: employee) => e.company.toLowerCase() === company.toLowerCase())
      setEmployees([...searchResult])
      setShowFilterBox(false)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        !token ? <></> :
          <>
            <div className='flex h-[100vh] flex-col md:flex-row'>
              <aside className='w-[100%] md:w-[200px]'>
                <div className='flex items-center w-[100%] justify-between'>
                  <div className='p-8 px-14 w-[200px]'>
                    <img
                      src="https://celetel.com/images/main_logo.svg?imwidth=128"
                      alt="celetel"
                    />
                  </div>
                  <div className='block md:hidden mr-5'>
                    <AiOutlineMenu
                      size={30}
                      cursor="pointer"
                      onClick={() => setShowMenu((prev) => !prev)}
                    />
                  </div>
                </div>
                <ul className={`list-none ${showMenu ? "" : "hidden"} md:block`}>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <HiHome
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Home
                  </li>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <MdPeople
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Matches
                  </li>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <MdOutlineSpaceDashboard
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Manage sources
                  </li>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <MdOutlineSpaceDashboard
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Integration
                  </li>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <MdOutlineSpaceDashboard
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Alerts
                  </li>
                  <li className='px-5 py-2 flex items-center cursor-pointer'>
                    <span className='mr-5'>
                      <AiFillStar
                        size={25}
                        color="#6b6666d8"
                      />
                    </span>
                    Settings
                  </li>
                </ul>
              </aside>
              <section className='bg-gray-100 flex-1 h-full'>
                <div className='flex flex-row p-7 border-none w-full items-center justify-between border-2 bg-gray-100 '>

                  <div className='flex items-center bg-white rounded overflow-hidden w-[70%] shadow-sm shadow-gray-500/50'>
                    <span className='p-2'><BsSearch
                      onClick={search}
                    /></span>

                    <input
                      type="text"
                      placeholder="search"
                      className='p-2 w-full outline-none'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>

                  <div className='flex items-center '>
                    <BsFillBellFill
                      className='mr-4'
                      size={28}
                      color="grey"
                    />
                    <span className='bg-blue-500 text-white rounded-full w-8 h-8 items-center justify-center flex'>{email[0].toUpperCase()}</span>
                  </div>

                </div>
                <h2 className='m-5 text-4xl font-semibold'>Customer Details</h2>

                <div className='m-5 flex flex-wrap items-center justify-between w-[80%]'>
                  <p className='font-semi bold text-2xl mb-6'>The terms you are tracking</p>
                  <div className='flex items-center'>
                    <button
                      onClick={() => setShowFilterBox(true)}
                      className='flex items-center rounded border-2 border-gray-300 px-7 py-1 mr-5'>
                      <span className='mr-4 flex'><BsFilterRight /></span>
                      Filter
                    </button>
                    <button
                      onClick={() => { setShowEmployee(true); setType("create") }}
                      className='flex items-center rounded  border-gray-300 px-7 py-1  bg-red-500 text-white'>

                      <span className='mr-4 '>
                        <AiOutlinePlus />
                      </span>
                      Add
                    </button>
                  </div>

                </div>

                <div className='m-5 border-2  w-[90%] md:w-[80%] bg-white shadow-md p-5 '>
                  <div className='flex justify-between bg-white p-2 text-sm'>
                    <p className='basis-[25%] px-2'>Username</p>
                    <p className='basis-[25%] px-2'>E-mail</p>
                    <p className='basis-[20%] px-2'>Phone-No</p>
                    <p className='basis-[15%] px-2'>Company</p>
                    <p className='basis-[15%] px-2'>Action</p>

                  </div>
                  {employees.map((emp) => (<div key={emp._id}>
                    <div className='h-[1px] bg-gray-200'></div>
                    <div className='flex justify-between bg-white p-2 '>
                      <p className='basis-[25%] w-[25%]  px-2 overflow-hidden'>{emp.username}</p>
                      <p className='basis-[25%] w-[25%]  px-2 overflow-hidden'>{emp.email}</p>
                      <p className='basis-[20%] w-[20%]  px-2 overflow-hidden'>{emp.phoneno}</p>
                      <p className='basis-[15%] w-[15%]  px-2 overflow-hidden'>{emp.company}</p>
                      <p className='flex basis-[15%]'>
                        <span className='mr-3 cursor-pointer hover:bg-gray-200 hover:rounded-full w-[20px] h-[20px] flex items-center justify-center'>
                          <GrFormEdit
                            color="#5324fa"
                            cursor="pointer"
                            onClick={() => edit(emp._id, emp)}
                          />
                        </span>
                        <span className='cursor-pointer hover:bg-gray-200 hover:rounded-full w-[20px] h-[20px] flex items-center justify-center'>
                          <AiOutlineDelete
                            onClick={() => deleteEmployee(emp._id)}
                          />
                        </span>
                      </p>

                    </div>
                  </div>))}
                </div>
              </section>
            </div>
            {showAddEmployee &&
              <Form
                close={() => setShowEmployee(false)}
                setFlag={setFlag}
                id={id}
                type={type}
                emp={singleEmployee}
              />
            }
            {
              showFilterBox &&
              <FilterBox
                submitHandler={filterApply}
                close={() => { setShowFilterBox(false) }} />
            }
          </>
      }
    </>

  )
}

export default dashboard


