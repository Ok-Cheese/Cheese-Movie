import { ReactNode, useRef } from 'react';
import { useClickAway } from 'react-use';

import Portal from 'components/portal';

import styles from './modal.module.scss';

interface IProps {
  children: ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: IProps) => {
  const closeRef = useRef(null);

  useClickAway(closeRef, closeModal);
  return (
    <Portal>
      <div className={styles.backdrop}>
        <div className={styles.modal} ref={closeRef}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
