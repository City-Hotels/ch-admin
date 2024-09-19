import { P3 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import { IMedia } from "@/services/hotel/payload";
import { uploadSupportChatImage } from "@/services/support";
import React, { useEffect, useMemo, useState } from "react";

const ChatMediaUploadItem: React.FC<{
  media?: File;
  uploadedMedia?:
  IMedia; messageId: string; index?: number
}> = ({ media, uploadedMedia, messageId }) => {
  const [uploadedPath, setUploadedPath] = useState(uploadedMedia?.Path);
  const [uploadedPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    if ((!messageId && uploadedPath) || !media) return;
    uploadSupportChatImage(media, messageId, setUploadPercentage).then((res) => {
      setUploadedPath(res.data.Path);
    })

    return () => {

    }
  }, [media, messageId, uploadedPath])

  const tempUrl = useMemo(() => {
    if (media) return URL.createObjectURL(media)
  }, [media])



  return <div className="flex flex-col h-30">
    <Img
      path={tempUrl || uploadedPath || ""}
      name={uploadedPath || tempUrl || ""}
      className="w-45 h-35 rounded-lg bg-white100"
    />
    {uploadedPercentage > 0 && uploadedPercentage < 100 && <P3> {uploadedPercentage}/100%</P3>}
  </div>
}

const ChatMedia: React.FC<{ medias?: File[], uploadedFiles?: IMedia[], messageId: string }> = ({ medias, uploadedFiles, messageId }) => {

  const totalItems = (uploadedFiles?.length || 0) + (medias?.length || 0);
  return (
    <div className={`grid grid-cols-${totalItems > 1 ? "2" : "1"}   gap-3`}>
      {uploadedFiles?.map((media: IMedia, i) => <ChatMediaUploadItem uploadedMedia={media} key={i} messageId={messageId} />)}
      {medias?.map((media: File, i) => <ChatMediaUploadItem media={media} key={i} messageId={messageId} />)}
    </div>
  );
}

export default ChatMedia;
