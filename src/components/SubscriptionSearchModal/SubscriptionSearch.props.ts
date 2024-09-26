export default interface SubscriptionSearchProps
  extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
  value?: string;
  promotionId?: string;
  onApartmentSelected: Function;
  setOpenSubscription: React.Dispatch<React.SetStateAction<boolean>>;
}
