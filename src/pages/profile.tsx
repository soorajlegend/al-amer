import { getSession, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import {useRouter} from 'next/router'


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

const Profile = () => {
    const { data: user } = useCurrentUser();

    const router = useRouter();

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center text-white'>
            <div onClick={() => router.push('/')} className="flex flex-col w-auto h-auto gap-6 items-center cursor-pointer">
                <h1 className='text-4xl font-semibold'>Who is watching?</h1>
                <img
                    src={user?.image?.length > 0 ? user?.image : `https://ui-avatars.com/api/?name=${user?.name}`}
                    className='w-42 aspect-square rounded-xl'
                    alt="user pic"
                />
                <span className='text-2xl'>{user?.name}</span>
            </div>
        </div>
    )
}

export default Profile