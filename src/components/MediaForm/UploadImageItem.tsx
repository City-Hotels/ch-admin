import Img from "@/components/Image/Image";
import React, { useEffect, useState } from "react";

const UploadImageItem: React.FC<{ img: File | string; onSelect: Function }> = ({
  img,
  onSelect
}) => {
  const [progress, setProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const uploadImageToCloud = (file: File) => {
    const data = new FormData();
    data.append("file", file, file.name);

    onSelect(data, setProgress).then(() => setIsUploaded(true));
  };

  useEffect(() => {
    if (!isUploaded && typeof img !== "string") uploadImageToCloud(img);
  }, []);

  return (
    <div>
      <Img
        path={typeof img === "string" ? img : URL.createObjectURL(img)}
        name="upload"
        className="h-[167.59px] w-[171.11px] rounded"
        responsive={true}
        height={167}
        width={171}
      />
      {progress !== 0 && <span>{progress}</span>}
    </div>
  );
};

export default UploadImageItem;
