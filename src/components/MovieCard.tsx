import React from 'react'
import { BsFillPlayFill} from 'react-icons/bs'
import FavoriteButton from './FavoriteButton'

interface CardProps {
    data: Record<string, any>
}

const MovieCard: React.FC<CardProps> = ({ data }) => {
    return (
        <div className='group bg-zinc-900 col-span relative h-[12vw] text-neutral-400'>
            <img
                src={data?.thumbnailUrl}
                className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]'
                alt="thumbnail" />
            <div className="opacity-0 absolute top-0 transition duration-500 z-10 invisible sm:visible delay-200 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">
                <img
                    src={data?.thumbnailUrl}
                    className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]'
                    alt="" />
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute transition w-full shadow-md rounded-md">
                    <div className="flex items-center gap-3">
                        <div 
                        onClick={() => {}}
                        className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white text-neutral-800 rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                    </div>
                    <p className='text-emerald-400 font-semibold mt-4'>
                        New <span className='text-white'>2023</span>
                    </p>
                    <div className="flex  mt-4 gap-2 items-center">
                        <p className='text-white text-[10px] lg:text-sm'>{data?.duration}</p>
                    </div>
                    <div className="flex  mt-4 gap-2 items-center">
                        <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard