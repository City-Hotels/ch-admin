import type { ChangeEvent } from "react";

export default interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  value: any;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
