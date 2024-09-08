import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import logo from "../assets/logo.png"

function Login() {
  const navigate = useNavigate();
  const {setToken, isAuth} = useAuthStore((state)=>state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (res) => {
      setToken(res.access, res.refresh)
      toast.success("Login successful")
      navigate("/")
    },
    onError: (err) => {
      console.log(err)
      toast.error("Hubo un error, intenta devuelta")
    }
  })

  if(isAuth){
    navigate("/")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
      <div
        className="flex flex-col items-center justify-center
        px-6 py-8 mx-auto md:h-[800px] lg:py-0"
      >
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl
          font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-[60px] h-[60px] mr-2"
            src={logo}
            alt="logo"
          />
          <span>Shop Zone</span>
        </Link>
        <div
          className="w-full md:w-[400px] lg:w-[500px]
          bg-slate-300 rounded-lg shadow dark:border
          md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className="text-xl text-center font-bold
              leading-tight tracking-tight text-gray-900
              md:text-2xl dark:text-white"
            >
                Log In to Shop Zone
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium
                  text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300
                  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium
                  text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loginMutation.isLoading}
                className={`w-full text-white ${loginMutation.isLoading ? "bg-blue-900": "bg-blue-600"}                focus:ring-4 focus:outline-none
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                dark:focus:ring-primary-800`}
              >
                  {
                    !loginMutation.isLoading && (
                      <p>Sign Up</p>
                    )
                  }
                  {
                    loginMutation.isLoading && (
                      <p>Loading ...</p>
                    )
                  }
              </button>
              <p
                className="text-sm font-light text-gray-500 dark:text-gray-400"
              >
                Dont have an account?
                <Link
                  to={'/register'}
                  className="font-medium text-primary-600
                  hover:underline dark:text-primary-500"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
}
export default Login;
