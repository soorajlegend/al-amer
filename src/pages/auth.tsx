import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import Input from '@/components/Input'
import { useData } from '@/components/DataProvider';
import { BsChevronDown } from 'react-icons/bs';

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);


    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Auth = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [variant, setVariant] = useState("login")

    const { language, setLanguage, languages, choose, content } = useData();

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
                <nav className="px-12 py-5 flex justify-between">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className='h-4 lg:h-7 ' />

                    <div className="relative z-40 right-0 mr-5 bg-rose-500/70 backdrop-blur-sm text-white group px-3 py-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer">
                        <span className='text-sm flex items-center tracking-wide'>{languages?.find(lang => lang.value == language)?.title} <BsChevronDown /></span>
                        <div className="absolute z-0 insets-0 mt-2 -translaste-x-full right-0 w-auto  bg-black/50 backdrop-blur-md rounded-md  px-1 pt-4 pb-1 hidden delay-500 group-hover:flex flex-col">
                            {
                                languages?.filter(lang => lang.value !== language).map(lang => (
                                    <span
                                        className='whitespace-nowrap py-1 px-3 hover:bg-white/80 hover:text-slate-800 w-full rounded-md transition-all'
                                        onClick={() => setLanguage(lang?.value)}
                                        key={lang?.value}>{lang?.title}</span>
                                ))
                            }
                        </div>
                    </div>
                </nav>
                <div className="flex justify-center w-full">
                    <div className="bg-black/80 backdrop-filter backdrop-blur-sm p-7 lg:p-12 rounded-lg text-white flex flex-col gap-y-4 w-full max-w-md">
                        <h2 className={`text-4xl mb-6 font-semibold ${choose("text-left", "text-right")}`}>{variant == "login" ? content?.signIn! : content.register! }</h2>
                        {variant == "register" && (
                            <Input
                                id='username'
                                label={content?.username!}
                                value={name}
                                onChange={(ev: any) => setName(ev.target.value)}
                            />
                        )}
                        <Input
                            id='email'
                            label={content?.email!}
                            value={email}
                            onChange={(ev: any) => setEmail(ev.target.value)}
                            type='email'
                        />
                        <Input
                            id='password'
                            label={content?.password!}
                            value={password}
                            onChange={(ev: any) => setPassword(ev.target.value)}
                            type='password'
                        />
                        <button onClick={variant === "login" ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                            {variant == "login" ? content?.login : content.register}
                        </button>

                        <div className="flex items-center gap-x-4 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/' })} className="w-10 h-10 bg-white text-slate-950 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className='text-neutral-500 mt-12 w-full text-center'>
                            {variant == "login" ? content?.firstTime : content?.alreadyHave}
                            <span
                                onClick={toggleVariant}
                                className="text-white mx-1 hover:underline cursor-pointer">
                                {variant == "login" ? content?.CreateAccount : content?.signIn}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth