import Image from 'next/image';
import React, { ReactNode } from 'react';
import bannerOrden from '@/assets/images/orden/banner_platos_comida.jpg';

type PropsLayout = {
  children: ReactNode;
};

const Layout = ({ children }: PropsLayout) => {
  return (
    <div className='flex flex-col items-center'>
      <main className='w-full'>{children}</main>
    </div>
  );
};

export default Layout;