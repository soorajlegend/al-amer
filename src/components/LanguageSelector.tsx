import React from 'react'
import { BsChevronDown } from 'react-icons/bs';
import { useData } from './DataProvider';

const LanguageSelector = () => {

    const { languages, language, setLanguage, choose } = useData();

    return (
        <div className={`relative z-40 right-0 mx-3 bg-rose-500/70 backdrop-blur-sm text-white group px-3 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer `}>
            <div className={`text-sm flex ${choose("flex-row","flex-row-reverse")} gap-x-3 items-center tracking-wide`}>
                <span>{languages?.find(lang => lang.value == language)?.title}</span>
                <BsChevronDown />
            </div>
            <div className="absolute z-0 insets-0 mt-2 -translaste-x-full right-0 w-full  bg-black/70 backdrop-blur-md rounded-md  px-1 pt-4 pb-1 hidden delay-500 group-hover:flex flex-col">
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
    )
}

export default LanguageSelector