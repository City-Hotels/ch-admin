import AvatarWithText from "./AvatarWithTexts";

function PopupToast(): JSX.Element {
  const testClassNames = "w-[400px] ml-40 mt-40";

  return (
    <div className={`${testClassNames} bg-white p-2 rounded-lg`}>
      <AvatarWithText
        withIcon={false}
        firstName="Leslie"
        lastName="Alexander"
        description="now"
        message="I've heard that some people with a history of blood clots had success with hormonal IUD"
        type="toast"
      />
    </div>
  );
}

export default PopupToast;
