import { IconProps } from '@/interface'

const Minus = (props: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 12H6" stroke={props?.fill || '#18181B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>    
  )
}

export default Minus

