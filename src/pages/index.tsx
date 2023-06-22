import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
import { useData } from '@/components/DataProvider';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
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

  const { data: user } = useCurrentUser()

  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const { content } = useData();

  return (
    <div className="flex flex-col">
      <InfoModal visible={isOpen!} onClose={closeModal!} />
      <Navbar
        username={user?.name}
        userImage={user?.image?.length > 0 ? user?.image : `/avatar.webp`} />
      <Billboard />
      <div className="pb-40">
        <MovieList title={content?.trending!} data={movies} />
        <MovieList title={content?.nav?.myList!} data={favorites} />
      </div>
    </div>
  )
}
