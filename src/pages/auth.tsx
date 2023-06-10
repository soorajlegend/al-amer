import Input from '@/components/Input'
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [variant, setVariant] = useState("login")


    const router = useRouter();

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant == "login" ? "register" : "login")
    }, [])


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            })
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }, [email, password, router])


    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password,
            });

            login();
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])

    return (
        <div className="relative bg-white min-h-screen h-full w-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black lg:bg-black/70 w-full min-h-screen h-full">
                <nav className="px-12 py-5">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className='h-4 lg:h-7 ' />
                </nav>
                <div className="flex justify-center w-full">
                    <div className="bg-black/80 backdrop-filter backdrop-blur-sm p-7 lg:p-12 rounded-lg text-white flex flex-col gap-y-4 w-full max-w-md">
                        <h2 className='text-4xl mb-6 font-semibold'>{variant == "login" ? "Sign in" : "Register"}</h2>
                        {variant == "register" && (
                            <Input
                                id='username'
                                label='Username'
                                value={name}
                                onChange={(ev: any) => setName(ev.target.value)}
                            />
                        )}
                        <Input
                            id='email'
                            label='email'
                            value={email}
                            onChange={(ev: any) => setEmail(ev.target.value)}
                            type='email'
                        />
                        <Input
                            id='password'
                            label='password'
                            value={password}
                            onChange={(ev: any) => setPassword(ev.target.value)}
                            type='password'
                        />
                        <button onClick={variant === "login" ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                            {variant == "login" ? "Login" : "Register"}
                        </button>

                        <div className="flex items-center gap-x-4 justify-center">
                            <div 
                            onClick={() => signIn('google', {callbackUrl: '/'})} 
                             className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div onClick={() => signIn('github', {callbackUrl: '/'})} className="w-10 h-10 bg-white text-slate-950 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className='text-neutral-500 mt-12 w-full text-center'>
                            {variant == "login" ? "First time using Al-amer?" : "Already hav an account?"}
                            <span 
                            onClick={toggleVariant} 
                            className="text-white ml-1 hover:underline cursor-pointer">
                                {variant == "login" ? "Create an account" : "Sign in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth