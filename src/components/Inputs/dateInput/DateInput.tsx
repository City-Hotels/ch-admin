import React from "react";

import { P } from "../../headings/Headings";
// import type DateInputProps from "./DateInput.props";
import styles from "./DateInput.module.scss";

interface BrowserFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  Icon?: React.ReactNode;
  label: string;
  InputProps?: {
    ref?: React.Ref<any>;
  };
  error?: boolean;
  focused?: boolean;
  ownerState?: any;
  placeHolder?: string;
  className: string;
}

type BrowserFieldComponent = (
  props: BrowserFieldProps & React.RefAttributes<HTMLDivElement>
) => React.ReactElement | null;

const DateInput = React.forwardRef(
  (props: BrowserFieldProps, inputRef: React.Ref<HTMLInputElement>) => {
    const {
      disabled,
      id,
      label,
      InputProps: { ref: containerRef } = {},
      // extracting `error`, 'focused', and `ownerState` as `input` does not support those props
      // focused,
      // ownerState,
      placeholder,
      Icon,
      className,
      ...other
    } = props;

    return (
      <div className={`${styles.date} ${className}`} id={id} ref={containerRef}>
        <div className="h-4 w-4"> {Icon}</div>
        <div className=" md:min-w-[96px] ">
          <P className="mb-3 hidden text-start text-white900 md:block">
            {label}
          </P>
          <div className="flex items-center gap-[10px]">
            <input
              disabled={disabled}
              className="w-full bg-transparent font-matter-bold font-bold focus:outline-none focus:ring-0"
              ref={inputRef}
              {...other}
              placeholder="Select Date"
            />
          </div>
          <P className=" mt-[10px] hidden text-white700 md:block">
            {placeholder}
          </P>
        </div>
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput as BrowserFieldComponent;
