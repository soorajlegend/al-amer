import React from 'react'
import { useData } from './DataProvider';

interface MobileMenuProps {
    visible: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {

    if (!visible) {
        return null;
    }

    const { content, choose } = useData();


    return (
        <div className={`bg-black/70 backdrop-blur-md w-56 absolute top-8 ${choose("left-0","right-0")} py-5 flex flex-col shadow-lg rounded-md`}>
            <div className="flex flex-col gap-4 text-slate-100">
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.home!}</div>
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.series!}</div>
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.films!}</div>
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.newAndPopular!}</div>
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.myList!}</div>
                <div className="px-3 text-center capitalize hover:underline">{content?.nav?.browseByLanguages!}</div>
            </div>
        </div>
    )
}

export default MobileMenu