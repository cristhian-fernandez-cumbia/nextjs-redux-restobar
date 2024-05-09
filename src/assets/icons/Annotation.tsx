import { IconProps } from '@/interface'

const Annotation = (props: IconProps) => {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" className={props?.className}>
      <path d="M7 8H17M7 12H11M12 20L8 16H5C4.46957 16 3.96086 15.7893 3.58579 15.4142C3.21071 15.0391 3 14.5304 3 14V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V14C21 14.5304 20.7893 15.0391 20.4142 15.4142C20.0391 15.7893 19.5304 16 19 16H16L12 20Z" stroke={props?.fill || "#18181B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Annotation