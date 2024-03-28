import type { FC, PropsWithChildren } from "react";
import { useRef } from "react";

import match from "@/utils/match";

import { useHandleOutsideClicks } from "@/hooks/useHandleOutsideClicks";
import styles from "./Modal.module.scss";
import type ModalProps from "./Modal.props";

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  variant = "filled",
  // size = "md",
  openModal,
  setOpenModal,
  className,
  ...rest
}) => {
  const pattern = match(variant, {
    plain: styles.pattern__plain,
    filled: styles.pattern__filled,
    default: ""
  });

  // const modal_size = match(size, {
  //   sm: styles.size__sm,
  //   md: styles.size__md,
  //   lg: styles.size__lg,
  //   xl: styles.size__xl,
  //   default: "sm"
  // });

  const overlay = useRef(null);

  const close = () => {
    setOpenModal(false);
  };

  useHandleOutsideClicks(overlay, close);

  return (
    <>
      {openModal && (
        <div className={`${styles.bg}`} {...rest}>
          <div className={styles.overlay} ref={overlay} />
          <div className={`${className} relative ${styles.modal} ${pattern}`}>
            <span
              className="absolute right-5 top-5 cursor-pointer"
              onClick={close}
            >
              close
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
