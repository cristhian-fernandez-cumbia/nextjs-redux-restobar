import Attencion from '@/container/attencion/Attencion'
import { AttencionProps } from '@/interface/attencion'
import React from 'react'

const OrdenId = ({ params }: AttencionProps) => {
  return (
    <Attencion params={params}/>
  )
}

export default OrdenId