import React, { useCallback, useEffect, useState } from 'react'
import NavItem from './NavItem'
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

interface NavbarProps {
    userImage: string;
    username: string;
}

const Navbar: React.FC<NavbarProps> = ({ userImage, username }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    const Top_offset = 66;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= Top_offset){
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
                window.removeEventListener('scroll', handleScroll);
        }

    }, []);

    return (
        <div className='w-full fixed z-40'>
            <div className={`flex px-4 lg:px-16 py-6 gap-x-4 ${showBackground ? "bg-zinc-900/90" : "bg-transparent"} items-center
             text-slate-100 `}>
                <img
                    src="./logo.png"
                    alt="logo"
                    className='h-4 lg:h-7' />
                <div className="ml-8 hidden lg:flex gap-5 items-center ">
                    <NavItem label='home' />
                    <NavItem label='Series' />
                    <NavItem label='Films' />
                    <NavItem label='New & Popular' />
                    <NavItem label='My list' />
                    <NavItem label='Browse by languages' />
                </div>
                <div onClick={toggleMobileMenu} className="relative lg:hidden flex  items-center gap-2 ml-8 cursor-pointer text-sm transition hover:opacity-90">
                    <span>Browse</span>
                    <BsChevronDown className={`transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>

                <div className="flex ml-auto items-center gap-7">
                    <div className="cursor-pointer hover:opacity-70">
                        <BsSearch />
                    </div>
                    <div className="cursor-pointer hover:opacity-70">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 overflow-hidden">
                            <img
                                className='rounded-full'
                                src={userImage}
                                alt="user pic" />
                        </div>
                        <BsChevronDown className={`transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`} />
                        <AccountMenu
                            userImage={userImage}
                            username={username}
                            visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar