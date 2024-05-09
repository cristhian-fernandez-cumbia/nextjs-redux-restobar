import React, { ReactNode } from 'react';
import MenuAttention from '@/components/menu/MenuAttention';
import Header from '@/components/header/Header';

type PropsLayout = {
  children: ReactNode;
};

const Layout = ({ children }: PropsLayout) => {
  return (
    <div className='flex flex-col items-center'>
      <Header/>
      <main className='w-full'>{children}</main>
      <footer className='w-full'>
      <MenuAttention/>
      </footer>
    </div>
  );
};

export default Layout;