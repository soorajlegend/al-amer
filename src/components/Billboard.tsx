import useBillBoard from '@/app/hooks/useBillboard'
import React from 'react'
import { AiOutlineInfoCircle} from 'react-icons/ai'

const Billboard = () => {

    const { data } = useBillBoard();

    return (
        <div className='w-full h-[65vh] relative'>
            <video
                className='w-full h-[65vh] object-cover brightness-[60%]'
                autoPlay
                muted
                loop
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}
            />

            <div className="absolute top-[30%] md:top[40%] ml-4 md:ml-16 text-white">
                <p className=' text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <p className='text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {data?.description}
                </p>
                <div className="flex items-center mgt-3 md:mt-4 gap-3">
                    <button className='bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex justify-center items-center hover:bg-white/20 transition'>
                        <AiOutlineInfoCircle className='mr-1' />
                        More info
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Billboard