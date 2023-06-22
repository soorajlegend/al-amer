import useBillBoard from '@/hooks/useBillboard'
import React, { useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';
import { useData } from './DataProvider';

const Billboard = () => {

    const { data } = useBillBoard();

    const { openModal } = useInfoModal();

    const { choose, content } = useData();

    const handleOpenModal = useCallback(() => [
        openModal(data?.id)
    ], [openModal, data?.id]);

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

            <div className={`absolute flex flex-col top-[30%] md:top[40%] ${choose("ml-4 md:ml-16 left-0 items-start","mr-4 md:mr-16 right-0 items-end text-right")} space-y-3 text-white`}>
                <p className='text-2xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <p className='text-base md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
                    {data?.description}
                </p>
                <div className={`flex ${choose("flex-row","flex-row-reverse")} items-center mt-3 md:mt-4 gap-3`}>
                    <PlayButton movieId={data?.id} />
                    <button
                        onClick={handleOpenModal}
                        className={`bg-white/30 text-white rounded-md py-2 px-2 md:px-4 space-x-2 w-auto text-xs lg:text-lg font-semibold flex ${choose("flex-row","flex-row-reverse space-x-reverse")} justify-center items-center hover:bg-white/20 transition`}>
                        <AiOutlineInfoCircle className='mr-1' />
                        <span>{content?.moreInfo}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Billboard