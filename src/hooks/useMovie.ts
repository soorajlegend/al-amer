import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useMovie = (id: string) => {
    const { data, error, isLoading, mutate} = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });

    return {
        data, 
        error,
        isLoading,
        mutate,
    }
}

export default useMovie;

// "title":"",
//   "description":"",
//   "videoUrl":""
//   "thumbnailUrl":""
//   "genre":""
//   "duration":""