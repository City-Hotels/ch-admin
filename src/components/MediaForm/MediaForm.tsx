import { H4, P, H5 } from "@/components/Headings/Headings";
import File from "@/assets/icons/file.svg";

import type { IMedia } from "@/services/hotel/payload";
import "react-image-crop/dist/ReactCrop.css";
import DeleteIcon from "@/assets/icons/delete-small.svg";
import EditIcon from "@/assets/icons/pencil.svg";
import type { ApiResponse } from "@/utils/api/calls";
import Img from "@/components/Image/Image";
import { ImageItem } from "@/components/Inputs/image/Image";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import styles from "./MediaForm.module.scss";

interface FormProps {
  onDelete: (itemId: string, path: string) => void;
  onSelect: (
    itemId: string,
    data: FormData,
    setProgress: Function
  ) => Promise<ApiResponse<{ Path: string }>>;
  previousFiles: IMedia[];
  itemId?: string;
}

const MediaForm: React.FC<FormProps> = ({
  onSelect,
  onDelete,
  previousFiles,
  itemId = ""
}) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files && files.length > 0) {
        const selectedImages = Array.from(files);
        // Ensure only up to four images are selected
        // if (selectedImages.length <= 4) {
        setImages(() => {
          // onChange([...prevImages.slice(-3), ...selectedImages]);
          return [...selectedImages];
        });
        // }
      }
    },
    [setImages]
  );
  const uploadImage = useCallback(
    (
      id: string,
      data: FormData,
      setUploadProgress: (progress: number) => void
    ) => {
      return onSelect(id, data, setUploadProgress).finally(() => {
        setImages([]);
      });
    },
    [onSelect, setImages]
  );

  const removeImage = useCallback(
    (index: number, uploadPath?: string) => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages.splice(index, 1);
        return newImages;
      });
      if (uploadPath) onDelete(itemId, uploadPath);
    },
    [onDelete, itemId, setImages]
  );
  return (
    <>
      <div className=" pb-[11.93px] font-black">
        <H4 className="pb-[39.32px]">Featured Images</H4>
        <div className="relative z-[100] flex h-[189px] w-full items-center justify-center rounded-[20px] border border-dashed border-primary400 bg-[rgb(255,245,231)]">
          <input
            type="file"
            name="file"
            onChange={handleImageChange}
            accept=".jpg,.jpeg,.png"
            className="absolute size-full  opacity-0"
            multiple
          />
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-[#FFCB92,53%] px-[9.9px] py-[7.3px]">
              <File />
            </div>
            <P className="text-[13px]">
              Drap and drop files or{" "}
              <span className="cursor-pointer text-primary400">Browse</span>
            </P>
            <H5>Photos must be JPEG or PNG format and least 2048x768</H5>
          </div>
        </div>

        {/* <div className="flex items-center gap-7 overflow-x-scroll pt-[33.5px]"> */}
        <div className="mt-5 grid grid-cols-5 gap-5 ">
          {images.map((image, index) => (
            <ImageItem
              UploadFunction={uploadImage}
              image={image}
              itemId={itemId}
              key={image.name}
              deleteFunction={(path: string) => removeImage(index, path)}
            />
          ))}
          {previousFiles.map((item) => (
            <div key={item.Path} className="relative h-[138px] w-32 ">
              <Img
                path={item.Path}
                alt={item.Path}
                name={item.Path}
                className=" h-[138px] w-32 "
              />
              <div className={styles.editIconWrapper}>
                <div className={styles.editIcons}>
                  <span onClick={() => onDelete(itemId, item.Path)}>
                    <DeleteIcon className={styles.icon} />
                  </span>
                  <EditIcon className={styles.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MediaForm;
