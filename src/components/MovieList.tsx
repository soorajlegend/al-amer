import React from 'react'
import { isEmpty } from 'lodash'
import MovieCard from './MovieCard';
import { useData } from './DataProvider';


interface MovieList {
    data: Record<string, any>[],
    title: string
}
const MovieList: React.FC<MovieList> = ({ data, title }) => {

    if (isEmpty(data)) {
        return null;
    }

    const { choose } = useData();


    return (
        <div className='lg:px-4 md:px-12 mt-4 space-y-8'>
            <div className={`text-white ${choose("text-left","text-right")}`}>
                <p className="text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {
                        data.map((movie) => (
                            <MovieCard
                                data={movie}
                                key={movie?.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList