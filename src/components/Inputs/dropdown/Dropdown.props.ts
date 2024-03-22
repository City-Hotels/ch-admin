import type { ChangeEvent } from "react";

interface OptionType {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: OptionType[];
  dropdownValue?: string | number;
  className?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  choice?: string;
  width?: string;
}
