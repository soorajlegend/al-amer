import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import PlayButton from './PlayButton'
import FavoriteButton from './FavoriteButton'
import useInfoModal from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'
import { useData } from './DataProvider'


interface InfoModalProps {
    visible: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {


    if (!visible) {
        return null;
    }

    const [isVisible, setIsVisible] = useState(!!visible);

    const { movieId } = useInfoModal();

    const { data = {} } = useMovie(movieId!);
    
    const { choose, content } = useData();

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);


    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);


    return (
        <div className='z-50 transition duration-300 bg-black/70 backdrop-blur-0 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? "scale-100" : "scale-0"} transform duration-300 relative flex-auto bg-zinc-900/90 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video
                            autoPlay
                            muted
                            loop
                            poster={data?.thumbnailUrl}
                            src={data?.videoUrl}
                            className='w-full brightness-[60%] object-cover h-full'
                        />
                        <div
                            onClick={handleClose}
                            className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center text-slate-200 hover:opacity-70">
                            <AiOutlineClose size={20} />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8 text-white">{data?.title}</p>
                            <div className="flex gap-4 items-center">
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>

                    <div className={`px-12 py-8 text-neutral-400 ${choose("text-left","text-right")} text-lg`}>
                        <p className='text-emerald-400 font-semibold'>{content?.new}</p>
                        <p>{data?.duration}</p>
                        <p>{data?.genre}</p>
                        <p>{data?.description}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InfoModal