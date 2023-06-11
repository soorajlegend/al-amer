import { useRouter } from 'next/router'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'


interface PlayButtonProps {
    movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

    const router = useRouter();

    return (
        <button onClick={() => router.push(`/watch/${movieId}`)} className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex justify-center items-center hover:opacity-60 transition text-neutral-600'>
            <BsFillPlayFill size={25} className='mr-1 ' />
            Play
        </button>
    )
}

export default PlayButton