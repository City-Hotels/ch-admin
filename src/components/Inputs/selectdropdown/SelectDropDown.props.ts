export default interface LocationDropDownProps
  extends React.HTMLProps<HTMLInputElement> {
  items: SelectItem[];
  label: string;
  placeholder: string;
  Icon?: any;
}

export interface SelectItem {
  label: string;
  value: string;
}
