import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../store/theme";
import Logo from "../assets/logo.png"
import React, { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode"
import { Token } from "../Interface";
import { CartComponent } from "./CartComponent";

const Header: React.FC = () => {
  const navigate = useNavigate()

  const [hiddenMenu, setHiddenMenu] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("");
  const toggleHiddenMenu = () => {setHiddenMenu(!hiddenMenu)}

  const { toggleDarkMode, darkMode } = useDarkMode();
  const token: string = useAuthStore.getState().access;
  const { isAuth } = useAuthStore()

  let is_admin: boolean;
  let avatar: string;

  if(isAuth) {
    const tokenDecoded: Token = jwt_decode(token)
    is_admin = tokenDecoded.is_staff;
    avatar = String(tokenDecoded.avatar)
  }

  useEffect(()=>{
    if(search !== ""){
      navigate(`search/${search}`)
    }else{
      navigate("/")
    }
  }, [search])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search !== ""){
      navigate(`search/${search}`)
    }else{
      navigate("/")
    }
  }

  function log_out() {
    useAuthStore.getState().logout()
    navigate("/login")
  }

  return (
    <Disclosure as="nav" className="bg-grey dark:bg-gray-800">
      {({ open }) => (
        <>
          {isAuth && (
            <CartComponent hiddenMenu={hiddenMenu} toggleHiddenMenu={toggleHiddenMenu}/>
          )}
          <div className="mx-auto max-w-7xl px-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-50">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={Logo}
                    alt="Logo"
                  />
                </Link>

                <div className="hidden sm:ml-6 md:block">

                  <div className="flex space-x-4">
                    <NavLink
                      to={'/'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={'/categories'}
                      className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      Categories
                    </NavLink>
                    {!isAuth && (
                      <NavLink
                        to={'/login'}
                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        Login
                      </NavLink>
                    )}
                    {is_admin && is_admin && (
                      <NavLink
                        to={'/admin'}
                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        Admin Panel
                      </NavLink>
                    )}
                  </div>

                </div>
              </div>

              <form onSubmit={handleOnSearch} className="relative hidden md:block">
                <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
                </button>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={search}
                  className="block w-full md:w-[200px] lg:w-[400px] xl:w-[600px] p-2
                  pl-10 text-sm text-gray-900 border border-gray-300 rounded-full
                  bg-gray-50 dark:bg-gray-700 outline-none
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                  " placeholder="Search..."
                />
              </form>

              <div className="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={toggleDarkMode}
                  type="button"
                >
                  {darkMode ?
                    <BsFillSunFill size={23} className="text-slate-200 hover:text-white"/>
                    :
                    <BsFillMoonStarsFill size={20} className="text-slate-900 hover:text-black"/>
                  }
                </button>

                {isAuth && (
                  <>
                    <button onClick={toggleHiddenMenu} className="text-slate-900 hover:text-black dark:text-slate-200 dark:hover:text-white">
                      <HiOutlineShoppingBag size={23}/>
                    </button>
                    <Menu as="div" className="relative me-2">
                      <div>
                        <Menu.Button className="flex rounded-full ml-8 text-sm focus:outline-none">
                          <img
                            className="h-9 w-9 rounded-full border border-black"
                            src={`${import.meta.env.VITE_BACKEND_URL}${avatar}`}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={`${active ? 'bg-gray-100 dark:bg-slate-700' : ''} block px-4 py-2 text-sm text-gray-700 dark:text-slate-200`}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <span
                                onClick={log_out}
                                className={`${active ? 'bg-gray-100 dark:bg-slate-700' : ''} block px-4 py-2 text-sm text-gray-700 dark:text-slate-200`}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}

              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <form onSubmit={handleOnSearch} className="relative mx-4">
              <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
              </button>
              <input
                type="text"
                onChange={handleInputChange}
                value={search}
                className="block w-full md:w-[200px] lg:w-[400px] xl:w-[600px] p-2
                pl-10 text-sm text-gray-900 border border-gray-300 rounded-full
                bg-gray-50 dark:bg-gray-700 outline-none
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                " placeholder="Search..."
              />
            </form>
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="w-full grid grid-cols-1">
                <Link
                  to={'/'}
                  className='bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white'
                >
                  Home
                </Link>

                <Link
                  to={'/cate'}
                  className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  Categories
                </Link>
                {!isAuth && (
                  <NavLink
                    to={'/login'}
                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Login
                  </NavLink>
                )}
              </div>
              {is_admin  && (
                <div className="w-full">
                  <Link
                    to={'/admin'}
                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header

