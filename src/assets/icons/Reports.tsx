import { IconProps } from '@/interface'

const Reports = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M5 19V4H4V20H20V19H5Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M14 11C12 11 11.92 10 10 10C7.66 10 6 13 6 13V18H20V6C18 6 16.14 11 14 11Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
    </svg>
  )
}

export default Reports



