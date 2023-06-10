import React from 'react'

interface ItemProps {
    label: string
}

const NavItem: React.FC<ItemProps> = ({ label }) => {
    return (
        <div className='px-3 text-sm text-slate-100 cursor-pointer hover:opacity-80 transition capitalize duration-500'>{label}</div>
    )
}

export default NavItem