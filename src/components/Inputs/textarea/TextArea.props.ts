export default interface TextAreaProps
  extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  className?: string;
  rightComponent?: React.ReactNode;
  borderRadius?: string;
}
