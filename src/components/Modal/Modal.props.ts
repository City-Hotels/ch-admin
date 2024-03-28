export default interface ModalProps {
  variant?: "plain" | "filled";
  size?: "sm" | "md" | "lg" | "xl";
  openModal: boolean;
  className?: string;
  setOpenModal: (state: boolean) => void;
}
