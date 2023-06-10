import { signOut } from 'next-auth/react';
import React from 'react'
import Link from 'next/link'

interface AccountMenuProps {
    visible: boolean
    userImage: string
    username: string
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, userImage, username }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className='text-slate-100 bg-black/70 backdrop-blur-md w-56 absolute top-12 right-0 py-5 flex flex-col rounded-md'>
            <div className="flex flex-col gap-3">
                <Link href='/profile' className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img
                        className='w-8 rounded-full'
                        src={userImage}
                        alt="user pic"
                    />
                    <p className='text-sm group-hover/item:underline capitalize'>{username}</p>
                </Link>
                <hr className='border-neutral-700 h-px my-2'/>
                <div onClick={() => signOut()} className="px-3 text-center text-sm hover:underline">Sign out of Al Amer</div>
            </div>
        </div>
    )
}

export default AccountMenu