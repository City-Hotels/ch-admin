// "use client";

// import { useState } from "react";
// import { H44, P3 } from "../Headings/Headings";
// import Img from "../Image/Image";
// import AvatarWithText from "./AvatarWithTexts";
// import ActionButtons from "./ActionButtons";
// import Question from "./question";

// // FAQ questions component
// function FAQQuestions(): JSX.Element {
//   const [isOpen, setIsOpen] = useState<boolean>(false); // later on this state will be managed by the parent element

//   const testClassNames = "mt-20 ml-20";

//   return (
//     <div
//       className={`bg-white ${!isOpen ? "md:h-30 h-35" : "sm:h-[17.5rem] h-[20.5rem] lg:h-[16rem]"} transition-all rounded-lg w-[70%] p-3 ${testClassNames}`}
//     >
//       <AvatarWithText
//         firstName="Leslie"
//         lastName="Alexander"
//         withIcon={true}
//         description="Sent a message"
//         message="1 min ago"
//         setIsOpen={setIsOpen}
//       />
//       <p className="text-black font-bold py-3">
//         If you could visit one planet, which would it be?
//       </p>
//       {isOpen && (
//         <>
//           <Question>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
//             corporis nesciunt magnam itaque cum culpa laudantium harum rem
//             voluptates doloribus! Lorem ipsum dolor sit amet consectetur
//             adipisicing elit. Ipsa, officiis!
//           </Question>

//           <div className="mt-4 flex items-center justify-between">
//             <ActionButtons
//               extraButton={<ActionButtons.Orange text="Publish" />}
//             >
//               <div className="space-x-4">
//                 <ActionButtons.Light text="Respond in chat" />
//                 <ActionButtons.Orange text="Answer" />
//               </div>
//             </ActionButtons>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////

// // POP-UP NOTIFICATIONS

// function NotificationPopup(): JSX.Element {
//   const testClassNames = "w-[400px] ml-40 mt-40";

//   return (
//     <div className={`${testClassNames} bg-white px-2 py-5 rounded-lg`}>
//       <H44 className=" text-md font-bold text-black mb-4 pb-2 border-b border-grey30 pl-3">
//         Notification
//       </H44>
//       <AvatarWithText
//         withIcon={false}
//         firstName="Leslie"
//         lastName="Alexander"
//         description=""
//         message="I've heard that some people with a history of blood clots had success with hormonal IUD"
//       />

//       <div className="px-3 my-3 flex items-start gap-2">
//         <Img
//           path="/images/icon/question.svg"
//           alt="question-icon"
//           name=""
//           className="h-5 w-5"
//         />
//         <span className="space-y-2">
//           <P3 className="font-semibold text-black">FAQ</P3>
//           <P3>A host responded to a question you asked</P3>
//           <button className="rounded-sm py-1.5 px-2 text-xs text-white bg-orange500">
//             View answer
//           </button>
//         </span>
//       </div>

//       <AvatarWithText
//         withIcon={false}
//         firstName="Leslie"
//         lastName="Alexander"
//         description="Asked a message"
//         message="1 minute ago"
//       />
//     </div>
//   );
// }

// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////

// // TOAST-LIKE POP-UP
// function PopupToast(): JSX.Element {
//   const testClassNames = "w-[400px] ml-40 mt-40";

//   return (
//     <div className={`${testClassNames} bg-white p-2 rounded-lg`}>
//       <AvatarWithText
//         withIcon={false}
//         firstName="Leslie"
//         lastName="Alexander"
//         description="now"
//         message="I've heard that some people with a history of blood clots had success with hormonal IUD"
//         type="toast"
//       />
//     </div>
//   );
// }

// // export default PopupToast;

// // export default NotificationPopup;
