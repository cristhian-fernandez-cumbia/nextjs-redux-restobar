'use client'
import React, { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormLogin from './FormLogin'
import Image from 'next/image'
import logo from '@/assets/images/logo/logo_bohemia.jpg'

// import { useSession } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  // const { data: session, status } = useSession();
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      }
    };
    checkSession();
  }, []);
  // useEffect(() => {
  //   if (status === 'authenticated' && session) {
  //     router.push('/');
  //   }
  // }, [status, session, router]);
  return (
    <div className='flex flex-col justify-center items-center relative'>
      <div className='bg-primary w-full flex justify-center h-64 transform -skew-y-[14deg] origin-bottom-left rounded-bl-[40px]'>
        
      </div>
      <Image alt="logo" src={logo} className="w-44 h-44 rounded-full border-8 border-white absolute top-0 mt-24"/>
      <h1 className='mb-4 mt-10 text-4xl font-semibold text-primary'>¡Bienvenido!</h1>
      <FormLogin />
    </div>
  )
}

export default Login