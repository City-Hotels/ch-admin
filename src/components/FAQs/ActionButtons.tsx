import { createContext } from "react";
import Button from "../Button/Button";

interface Text {
  text?: string;
  children?: string;
}

interface ActionButtonsProps {
  children: JSX.Element | JSX.Element[];
  extraButton?: JSX.Element;
}

// temporarily set up as empty object
const ActionButtonsContext = createContext({});

function ActionButtons({
  children,
  extraButton
}: ActionButtonsProps): JSX.Element {
  return (
    <ActionButtonsContext.Provider value={{}}>
      <div
        className={`${
          extraButton ? "justify-between" : "justify-end space-x-4"
        }  flex items-center w-full`}
      >
        {extraButton && extraButton}
        {children}
      </div>
    </ActionButtonsContext.Provider>
  );
}

function Orange({ text }: Text) {
  return (
    <Button variant="outline" size="sm" className="text-black">
      {text}
    </Button>
  );
}

function Light({ text }: Text) {
  return (
    <Button variant="outline" size="sm" color="muted" className="text-white">
      {text}
    </Button>
  );
}

ActionButtons.Light = Light;
ActionButtons.Orange = Orange;

export default ActionButtons;
