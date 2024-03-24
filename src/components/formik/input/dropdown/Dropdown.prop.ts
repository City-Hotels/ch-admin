interface OptionType {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: OptionType[];
  className?: string;
  required?: boolean;
  choice?: string;
  name: string;
  width?: string;
}
