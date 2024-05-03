import { H44, H5, P3 } from "../Headings/Headings";
import TextArea from "../Inputs/textarea/TextArea";
import ActionButtons from "./ActionButtons";
import Question from "./Question";

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// THIS GETS PASSED AS THE "CHILDREN" PROP OF Modal.Window
function FAQs(): JSX.Element {
  return (
    <div className="w-full">
      <header className=" border-b  border-grey30">
        <H5 className="text-black  text-center mb-1">Respond to FAQ</H5>
        <P3 weight="bold" className="mb-4 max-w-[90%] text-black">
          Antonio Banderas asked a question. Respond to the question to help him
          and future clients make decision to book space.
        </P3>
      </header>
      <section className=" mt-4">
        <H44 className=" text-md font-semibold text-black mb-4">Question</H44>
        <Question>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
          corporis nesciunt magnam itaque cum culpa laudantium harum rem
          voluptates doloribus! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsa, officiis!
        </Question>
        <Response />
      </section>
      <div className="mt-4">
        <ActionButtons>
          <ActionButtons.Orange text="Respond & publish" />
          <ActionButtons.Light text="Respond in chat" />
        </ActionButtons>
      </div>
    </div>
  );
}

/////////////////////////////////////
// scoped only to this component
function Response(): JSX.Element {
  return (
    <section className=" mt-4">
      <H44 className=" text-md font-semibold text-black mb-4">
        Your Response
      </H44>
      <TextArea
        name="your response"
        className=" rounded-md resize-none border w-full min-h-[8rem] outline-none text-black text-[14px]"
      />
    </section>
  );
}

export default FAQs;
