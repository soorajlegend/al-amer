import React from 'react'
import { useRouter } from 'next/router'
import useMovie from '@/hooks/useMovie';
import { BsChevronLeft } from 'react-icons/bs'


const Watch = () => {
    const router = useRouter();

    const {movieId} = router?.query;

    const { data } = useMovie(movieId as string);


    return (
        <div className='w-screen h-screen'>
            <nav className='fixed w-full p-4 z-10 flex items-center gap-8 bg-black/60 backdrop-blur-md text-slate-400'>
                <BsChevronLeft onClick={() => router.push('/')} className='cursor-pointer' size={30} />
                <p className='text-xl md:text-2xl font-bold'>
                    <span className='font-light'>Watching: </span>
                    {data?.title}
                </p>
            </nav>
            <video 
            src={data?.videoUrl} 
            autoPlay
            controls
            className='h-full w-full'
            />
        </div>
    )
}

export default Watch;