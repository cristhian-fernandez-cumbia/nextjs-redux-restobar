import logo_bohemia from '@/assets/images/logo/logo_bohemia-white.png'
import Image from 'next/image';
import Menu from "../menu/Menu"
import Link from 'next/link'


const Header = () => {
  return (
    <div className="flex bg-primary justify-between items-center pb-2  px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 fixed top-0 w-full z-50">
      <Link href={`/`}>
        <Image src={logo_bohemia} alt="Logo Bohemia Restobar" className="w-36" priority={true}/>
      </Link>
      <Menu />
    </div>
  )
}

export default Header