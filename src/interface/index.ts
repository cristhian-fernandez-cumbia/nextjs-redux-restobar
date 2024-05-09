export interface IconProps {
  fill?: string;
  style?: any;
  className?:string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}