import { H44, P3 } from "../Headings/Headings";
import Img from "../Image/Image";
import AvatarWithText from "./AvatarWithTexts";
import MessageIcon from "@/assets/icons/question.svg";

function NotificationPopup(): JSX.Element {
  const testClassNames = "w-[400px] ml-40 mt-40";

  return (
    <div className={`${testClassNames} bg-white px-2 py-5 rounded-lg`}>
      <H44 className=" text-md font-bold text-black mb-4 pb-2 border-b border-grey30 pl-3">
        Notification
      </H44>
      <AvatarWithText
        withIcon={false}
        firstName="Leslie"
        lastName="Alexander"
        description=""
        message="I've heard that some people with a history of blood clots had success with hormonal IUD"
      />

      <div className="px-3 my-3 flex items-start gap-2">
        <MessageIcon />
        <span className="space-y-2">
          <P3 className="font-semibold text-black">FAQ</P3>
          <P3>A host responded to a question you asked</P3>
          <button className="rounded-sm py-1.5 px-2 text-xs text-white bg-orange500">
            View answer
          </button>
        </span>
      </div>

      <AvatarWithText
        withIcon={false}
        firstName="Leslie"
        lastName="Alexander"
        description="Asked a message"
        message="1 minute ago"
      />
    </div>
  );
}

export default NotificationPopup;
