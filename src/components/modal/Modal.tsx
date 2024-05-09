import styles from './Modal.module.css';
import Button from '../button/Button';
import { ModalProps } from '@/interface';


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
        {/* <Button onClick={onClose} className={styles.bottomRightButton}>
          <h3>Cerrar</h3>
        </Button> */}
      </div>
    </div>
  );
};

export default Modal;
