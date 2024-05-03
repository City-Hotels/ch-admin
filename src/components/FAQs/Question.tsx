import { P3 } from "../Headings/Headings";

interface Text {
  text?: string;
  children?: string;
}

function Question({ children }: Text) {
  return (
    <div className="border border-grey30 py-2 px-3 rounded-md">
      <P3>{children}</P3>
    </div>
  );
}

export default Question;
