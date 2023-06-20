import axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import useFavorites from '@/hooks/useFavorites';
import useCurrentUser from '@/hooks/useCurrentUser';


interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {

    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {

        let response;

        if (isFavorite) {
            response = await axios.patch('/api/favorite', { movieId });
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }   

        const updateFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser, 
            favoriteIds: updateFavoriteIds
        });

        mutateFavorites();

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? IoHeartSharp : IoHeartOutline

    return (
        <div onClick={toggleFavorites} className='cursor-pointer group/item p-1 w-8 h-8 lg:w-10 lg:h-10  bg-black/50 rounded-full flex justify-center items-center transition  hover:border-neutral-500'>
            <Icon className={`transition ${isFavorite ? "text-red-700 hover:opacity-50 " : "text-neutral-300 hover:text-neutral-500 "}`} size={30} />
        </div>
    )
}

export default FavoriteButton