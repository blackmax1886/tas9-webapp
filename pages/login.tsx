import { GetUserByEmailDocument, GetUserByEmailQuery } from '@/graphql/dist/client';
import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Login: NextPage = () => {
  const { data: session , status} = useSession()
  const email = session?.user?.email
  const {loading, error, data} = useQuery<GetUserByEmailQuery>(
    GetUserByEmailDocument,
    {variables: {email:email}}
    )

  if (session && session.user) {
    return (
      <>
      {/* Signed in as {session.user.email} <br /> */}
      Hello, {data?.userByEmail?.name} <br />
      Your ID is {data?.userByEmail?.id} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <Link href="/">Go to Home</Link>
    </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Login;
