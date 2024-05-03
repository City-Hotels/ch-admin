import Avatar from "../Avatar/Avatar";
import { P3 } from "../Headings/Headings";
import Img from "../Image/Image";

interface AvatarWithTextProps {
  withIcon: boolean;
  setIsOpen?: Function;
  firstName: string;
  lastName: string;
  description: string;
  message: string;
  type?: string;
}

function AvatarWithText({
  withIcon = false,
  setIsOpen,
  firstName,
  lastName,
  description,
  message,
  type
}: AvatarWithTextProps): JSX.Element {
  return (
    <div
      className={`flex gap-2.5 items-center  ${withIcon ? "border-b border-b-grey30" : ""} ${type !== "toast" ? "px-3" : ""} py-2`}
    >
      <Avatar
        Firstname={firstName}
        Lastname={lastName}
        Imageurl="/images/user/user-01.png"
        className={type === "toast" ? "w-8 h-8" : "h-10 w-10"}
      />
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <P3 className="text-black font-semibold">
            {firstName + ` ${lastName}`}
            <span className="text-xs"> {description}</span>
          </P3>
          {withIcon && (
            <button onClick={() => setIsOpen?.((s: boolean) => !s)}>
              <Img
                path="/images/icon/icon-arrow-down.svg"
                alt="arrow-down"
                name=""
                className="h-3 w-3"
              />
            </button>
          )}
        </div>
        <P3>{message}</P3>
      </div>
    </div>
  );
}

export default AvatarWithText;
