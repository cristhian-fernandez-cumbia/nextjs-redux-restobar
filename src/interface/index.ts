export interface IconProps {
  fill?: string;
  style?: any;
  className?:string;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}