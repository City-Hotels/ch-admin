import type { ChangeEvent } from "react";
import { useState } from "react";
import type InputProps from "./Input.props";

const AmountInput: React.FC<InputProps> = (props) => {
  const [amount, setAmount] = useState<string>("");

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputAmount = event.target.value;

    // Regular expression to match ddd.dd format
    const regex = /^\d{0,3}(\.\d{0,2})?$/;

    // Check if the input matches the format, if not, do not update the state
    if (regex.test(inputAmount) || inputAmount === "") {
      setAmount(inputAmount);
    }

    if (props.onChange) props.onChange(event);
  };
  return <input value={amount} onChange={handleAmountChange} {...props} />;
};

export default AmountInput;
