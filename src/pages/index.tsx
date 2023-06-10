import { getSession, signOut } from 'next-auth/react';
import { NextPageContext} from 'next';
import useCurrentUser from '@/app/hooks/useCurrentUser';

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
    <div className="text-4xl">
      Homepage
    <p>logged in as: {user?.email}</p>
      <button
        className='h-10 w-full bg-white'
        onClick={() => signOut()}
      >Logout</button>
    </div>
  )
}
