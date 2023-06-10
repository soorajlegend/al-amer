import { getSession, signOut } from 'next-auth/react';
import { NextPageContext} from 'next';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';

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
  return (
    <div className="flex flex-col">
        <Navbar
        username={user?.name}
        userImage={user?.image?.length > 0 ? user?.image : `https://ui-avatars.com/api/?name=${user?.name}`}/>
      {/* <button
        className='h-10 w-full bg-white'
        onClick={() => signOut()}
      >Logout</button> */}
    </div>
  )
}
