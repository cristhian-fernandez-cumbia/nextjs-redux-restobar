import React from 'react';
import { useRouter } from "next/navigation"
import { User, Lock } from "@/assets/icons";
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

const FormLogin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState:{errors} } = useForm(); 
  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials',{
      username: data.username,
      password: data.password,
      redirect: false
    })
    console.log({res});
    if (res && res.ok) {
      router.push("/");
    } else {
      alert("Usuario/Contraseña invalida")
    }
  })
  
  return (
    <form className='flex flex-col w-96 mx-auto' onSubmit={onSubmit}>
      <div className="relative">
        <User fill="#1C2E45" className="absolute top-6 left-3"/>
        <input 
          type="text"
          {...register("username", { required: true })}
          placeholder='Usuario' 
          className='form-input'
        />
        {
          errors.username && ( 
            <span className="text-red-500 text-xs">
              Usuario es requerido
            </span>
          )
        }
      </div>
      <div className="relative">
        <Lock fill="#1C2E45" className="absolute top-6 left-3"/>
        <input 
          type="password"
          {...register("password", { required: true })}
          placeholder='Contraseña' 
          className='form-input'
        />
        {
          errors.password && ( 
            <span className="text-red-500 text-xs">
              Contraseña es requerida
            </span>
          )
        }
      </div>
 
      <button className='bg-red-400 w-full p-3 rounded-lg text-white text-lg hover:bg-red-700 mt-4' >Ingresar</button>
    </form>
  )
}

export default FormLogin