import type { ChangeEventHandler } from "react";

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
  label?: string;
  width?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
}
