export default interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "round" | "text" | "outline";
  children?: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "black"
    | "muted"
    | "danger"
    | "neutral"
    | "media"
    | "text"
    | "text-dark"
    | "text-danger"
    | "outline"
    | "outline-dark";
  outline?: boolean;
  isLoading?: boolean;
}
