import { getSession } from 'next-auth/react';
import { NextPageContext} from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() {

    const { data: user} = useCurrentUser()

    const {data: movies = []} = useMovieList();
    const {data: favorites = []} = useFavorites();
    const { isOpen, closeModal} = useInfoModal();

  return (
    <div className="flex flex-col">
      <InfoModal visible={isOpen!} onClose={closeModal!} />
        <Navbar
        username={user?.name}
        userImage={user?.image?.length > 0 ? user?.image : `https://ui-avatars.com/api/?name=${user?.name}`}/>
        <Billboard />
        <div className="pb-40">
            <MovieList title='Trending' data={movies} />
            <MovieList title='My List' data={favorites} />
        </div>
    </div>
  )
}
