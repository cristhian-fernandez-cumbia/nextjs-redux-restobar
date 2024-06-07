import { IconProps } from '@/interface'

const Reports = (props: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M12 5.4L10 6.7V5H8V8L4 10.6L4.6 11.4L12 6.6L19.4 11.4L20 10.6L12 5.4Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
      <path d="M12 8L6 12V19H11V16H13V19H18V12L12 8Z" fill={props?.fill || "#1C2E45"} fillOpacity="0.6"/>
    </svg>
  )
}

export default Reports



