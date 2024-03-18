'use client'
import { useRouter } from "next/navigation"
import { User, Lock } from "@/assets/icons";

const FormLogin = () => {
  const router = useRouter();
  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push('/mesas')
  }
  
  return (
    <form className='flex flex-col w-96 mx-auto' onSubmit={onSubmit}>
      <div className="relative">
        <User fill="#1C2E45" className="absolute top-2 left-3"/>
        <input type="text" placeholder='Usuario' className='form-input'/>
      </div>
      <div className="relative">
        <Lock fill="#1C2E45" className="absolute top-2 left-3"/>
        <input type="password" placeholder='Contraseña' className='form-input'/>
      </div>
 
      <button className='bg-red-400 w-full p-3 rounded-lg text-white text-lg hover:bg-red-700' >Ingresar</button>
    </form>
  )
}

export default FormLogin