import { IconProps } from '@/interface'

const Money = (props: IconProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M20 18H6V17H19V10H20V18Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M17 8V15H5V8H17ZM18 7H4V16H18V7Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M7 10H6V13H7V14H11C9.619 14 8.5 12.881 8.5 11.5C8.5 10.119 9.619 9 11 9H7V10Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M15 10V9H11C12.381 9 13.5 10.119 13.5 11.5C13.5 12.881 12.381 14 11 14H15V13H16V10H15Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
    </svg>
  )
}

export default Money



