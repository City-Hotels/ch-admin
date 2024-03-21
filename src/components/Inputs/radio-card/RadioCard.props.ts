export default interface RadioCardProps {
  label: string;
  description: string;
  value: string;
  checked?: boolean;
  onSelect: (type: string) => void;
}
