import React from 'react'

interface MobileMenuProps {
    visible: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {

    if(!visible){
        return null;
    }

  return (
    <div className='bg-black/70 backdrop-blur-md w-56 absolute top-8  left-0 py-5 flex flex-col shadow-lg rounded-md '>
        <div className="flex flex-col gap-4 text-slate-100">
            <div className="px-3 text-center capitalize hover:underline">Home</div>
            <div className="px-3 text-center capitalize hover:underline">Series</div>
            <div className="px-3 text-center capitalize hover:underline">Films</div>
            <div className="px-3 text-center capitalize hover:underline">New and popular</div>
            <div className="px-3 text-center capitalize hover:underline">my list</div>
            <div className="px-3 text-center capitalize hover:underline">Browse by languages</div>
        </div>
    </div>
  )
}

export default MobileMenu