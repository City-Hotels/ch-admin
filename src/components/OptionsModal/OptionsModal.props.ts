import { ISubscribers } from "@/services/promotions/payload";

export default interface OptionsModalProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
  subscriber?: ISubscribers;
  onClose: Function;
  refetch: Function;
}
