import Image from 'next/image'
import React from 'react'
import banner_dishes_bohemia from '@/assets/images/orden/banner_dishes_restobar_bohemia.jpg'

interface HeaderAttentionProps {
  text: string;
}

const HeaderAttention: React.FC<HeaderAttentionProps> = ({ text }) => {
  return (
    <div className="relative mb-3">
      <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-white text-3xl font-bold bg-black bg-opacity-70 px-4 py-2 rounded-lg">{text}</h1>
      </div>
      <div className="relative h-20 overflow-hidden rounded-lg">
          <Image src={banner_dishes_bohemia} alt="banner_dishes_bohemia" layout="fill" objectFit="cover" className="rounded-lg" />
      </div>
  </div>
  )
}

export default HeaderAttention