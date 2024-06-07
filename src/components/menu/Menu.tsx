'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import MenuItem from './MenuItem';
import Button from '../button/Button';
import { signOut } from 'next-auth/react';
import { Home, Reports, SignOff } from '@/assets/icons';

const Menu: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleCloseClick = () => {
        signOut()
    };

    return (
        <nav className="flex items-center">
            <div>
                <Button className="text-white hover:text-gray-300" onClick={() => setShowMenu(!showMenu)}> 
                    <svg className="w-10 h-10 mt-3" viewBox="0 0 24 24" fill="none">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>
                {showMenu && (
                    <ul className="absolute top-[70px] left-0 bg-black text-white w-full py-6 px-12 rounded shadow-lg animate-slideDown duration-3000 z-10">
                        <Link href={`/`}>
                            <li className='flex flex-row mb-2 hover:cursor-pointer'>
                                <Home fill='#FFFFFF'/> 
                                <MenuItem text="INICIO"/> 
                            </li> 
                        </Link>
                        <Link href={`/reports/orders`}>
                            <li className='flex flex-row mb-2 hover:cursor-pointer'>
                                <Reports fill='#FFFFFF'/> 
                                <MenuItem text="REPORTE"/> 
                            </li> 
                        </Link>
                        <li className='flex flex-row hover:cursor-pointer' onClick={handleCloseClick}>
                            <SignOff fill='#FFFFFF'/> 
                            <MenuItem text="CERRAR" /> 
                        </li> 
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Menu;
