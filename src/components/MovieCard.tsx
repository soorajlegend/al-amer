import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './FavoriteButton'
import { useRouter } from 'next/router'
import useInfoModal from '@/hooks/useInfoModal'
import { BsChevronDown } from 'react-icons/bs'
import { useData } from './DataProvider'

interface CardProps {
    data: Record<string, any>
}

const MovieCard: React.FC<CardProps> = ({ data }) => {

    const router = useRouter();

    const { openModal } = useInfoModal();

    const { choose, content } = useData();


    return (
        <div className='group bg-zinc-900 col-span relative pb-5 md:pb-0 h-[23rem] lg:h-[13vw] text-neutral-400'>
            <img
                src={data?.thumbnailUrl}
                className='cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[24vh] lg:h-[13vw]'
                alt="thumbnail" />
            <div className="lg:opacity-0 absolute top-0 transition duration-500 z-10 sm:visible  delay-200 w-full lg:scale-0 md:group-hover:scale-110 md:group-hover:-translate-y-[6vw] md:group-hover:translate-x-[2vw] group-hover:opacity-100 group-hover:z-40">
                <img
                    src={data?.thumbnailUrl}
                    onClick={() => router.push(`/watch/${data?.id}`)}
                    className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[24vh] lg:h-[13vw]'
                    alt="hover card image" />
                <div className="z-10 bg-zinc-800 px-5 lg:px-4 p-2 pb-4 lg:p-4  absolute transition w-full shadow-md rounded-md">
                    <div className={`flex ${choose("flex-row", "flex-row-reverse")} items-center gap-3`}>
                        <div
                            onClick={() => router.push(`/watch/${data?.id}`)}
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white text-neutral-800 rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className={`cursor-pointer ${choose("ml-auto", "mr-auto")} group/item p-2 w-8 h-8 lg:w-10 lg:h-10  bg-black/50 rounded-full flex justify-center items-center transition text-neutral-300  hover:border-neutral-500`}>
                            <BsChevronDown size={25} />
                        </div>
                    </div>
                    <p className='text-emerald-400 font-semibold mt-4'>
                        {content?.new} <span className='text-white'>2023</span>
                    </p>
                    <div className={`flex ${choose("justify-start", "justify-end")} mt-4 gap-2 items-center`}>
                        <p className='text-white text-[10px] lg:text-sm'>{data?.duration}</p>
                    </div>
                    <div className={`flex ${choose("justify-start", "justify-end")} mt-4 gap-2 items-center`}>
                        <p className='text-white text-[10px] lg:text-sm'>{data?.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard