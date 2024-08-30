import Img from "@/components/Image/Image";

function ChatMedia({ images }: { images?: File[] }) {
  const tempUrls = images?.map((img) => URL.createObjectURL(img));

  if (!tempUrls?.length) return null;

  return (
    <div className="flex gap-2 ">
      {tempUrls.map((tempUrl, i) => (
        <Img
          path={tempUrl}
          name={tempUrl}
          key={i}
          className="w-[100px] h-[72px] rounded-md"
        />
      ))}
    </div>
  );
}

export default ChatMedia;
