export default interface DimensionInputProps
  extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
}
