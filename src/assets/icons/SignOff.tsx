import { IconProps } from '@/interface'

const SignOff = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M14 6.29999V9.59999C15.2 10.3 16 11.6 16 13C16 15.2 14.2 17 12 17C9.8 17 8 15.2 8 13C8 11.5 8.8 10.2 10 9.59999V6.29999C7.1 7.19999 5 9.79999 5 13C5 16.9 8.1 20 12 20C15.9 20 19 16.9 19 13C19 9.79999 16.9 7.19999 14 6.29999Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M11 5H13V12H11V5Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
    </svg>
  )
}

export default SignOff



