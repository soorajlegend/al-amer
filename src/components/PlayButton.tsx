import { useRouter } from 'next/router'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { useData } from './DataProvider'


interface PlayButtonProps {
    movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

    const router = useRouter();

    const { choose, content } = useData();

    return (
        <button onClick={() => router.push(`/watch/${movieId}`)} className={`bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold space-x-2 flex ${choose("flex-row","flex-row-reverse space-x-reverse")}  justify-center items-center hover:opacity-60 transition text-neutral-600`}>
            <BsFillPlayFill size={25} className='mr-1' />
            <span>{content?.play}</span>
        </button>
    )
}

export default PlayButton