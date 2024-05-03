import { useState } from "react";
import AvatarWithText from "./AvatarWithTexts";
import Question from "./Question";
import ActionButtons from "./ActionButtons";

function FAQQuestions(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false); // later on this state will be managed by the parent element

  const testClassNames = "mt-20 ml-20";

  return (
    <div
      className={`bg-white ${
        !isOpen ? "md:h-30 h-35" : "sm:h-[17.5rem] h-[20.5rem] lg:h-[16rem]"
      } transition-all rounded-lg w-[70%] p-3 ${testClassNames}`}
    >
      <AvatarWithText
        firstName="Leslie"
        lastName="Alexander"
        withIcon={true}
        description="Sent a message"
        message="1 min ago"
        setIsOpen={setIsOpen}
      />
      <p className="text-black font-bold py-3">
        If you could visit one planet, which would it be?
      </p>
      {isOpen && (
        <>
          <Question>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            corporis nesciunt magnam itaque cum culpa laudantium harum rem
            voluptates doloribus! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsa, officiis!
          </Question>

          <div className="mt-4 flex items-center justify-between">
            <ActionButtons
              extraButton={<ActionButtons.Orange text="Publish" />}
            >
              <div className="space-x-4">
                <ActionButtons.Light text="Respond in chat" />
                <ActionButtons.Orange text="Answer" />
              </div>
            </ActionButtons>
          </div>
        </>
      )}
    </div>
  );
}

export default FAQQuestions;
