import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import { Label, P } from "@/components/Headings/Headings";
import Plus from "@/assets/icons/plus.svg";
import DeleteIcon from "@/assets/icons/delete-small.svg";
import EditIcon from "@/assets/icons/pencil.svg";
import type { IMedia } from "@/services/apartment/payload";
import type { IMedia as IHotelMedia } from "@/services/hotel/payload";
import type { ApiResponse } from "@/utils/api/calls";
import Img from "../../images/Image";
import styles from "./Image.module.scss";

export const ImageItem: React.FC<{
  image: File;
  itemId: string;
  UploadFunction: (
    itemId: string,
    data: FormData,
    setUploadProgress: (progress: number) => void
  ) => Promise<
    ApiResponse<{
      Path: string;
    }>
  >;
  deleteFunction: (itemId: string) => void;
}> = ({ image, itemId, UploadFunction, deleteFunction }) => {
  const [file, setFile] = useState(image);
  const [uploadedPath, setUploadedPath] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!itemId || !file) return;

    const data = new FormData();
    data.append("file", file, file.name);
    if (uploadedPath) deleteFunction(uploadedPath);
    UploadFunction(itemId, data, setUploadProgress).then((res) => {
      setUploadedPath(res.data.Path);
    });
  }, [file, itemId]);

  if (uploadProgress > 0 && uploadProgress < 100)
    return (
      <div className=" flex h-[138px] w-28 cursor-pointer items-center justify-center rounded-md bg-[#F3F5FB] object-contain px-2 shadow md:w-[138px]">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-orange-400"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      </div>
    );

  if (uploadProgress === 100)
    return (
      <div className="relative h-[138px] w-32 ">
        <img
          src={URL.createObjectURL(file)}
          alt={`Image ${file.name}`}
          className="h-[138px] w-28 cursor-pointer  rounded-md object-cover shadow md:w-[138px]"
        />
        <div className={styles.editIconWrapper}>
          <div className={styles.editIcons}>
            <span onClick={() => deleteFunction(uploadedPath)}>
              <DeleteIcon className={styles.icon} />
            </span>
            <div>
              <EditIcon className={styles.icon} />
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={({ target }) =>
                  target &&
                  target.files &&
                  target.files[0] &&
                  setFile(target.files[0])
                }
              />
            </div>
          </div>
        </div>
      </div>
    );

  return <></>;
};

export const UploadedImageItem: React.FC<{
  item: IMedia;
  deleteFunction: (itemId: string, path: string) => void;
  itemId: string;
}> = ({ item, deleteFunction, itemId }) => {
  return (
    <div key={item.Path} className="relative  h-[138px] w-full">
      <Img
        path={item.Path}
        alt={item.Path}
        name={item.Path}
        className="h-[138px] w-full "
        fill
      />
      <div className={styles.editIconWrapper}>
        <div className={styles.editIcons}>
          <span onClick={() => deleteFunction(itemId, item.Path)}>
            <DeleteIcon className={styles.icon} />
          </span>
          <EditIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

const ImageInput: React.FC<{
  itemId: string;
  thirdPartySelected?: File[];
  preSelectedImages: IMedia[] | IHotelMedia[];
  UploadFunction: (
    itemId: string,
    data: FormData,
    setUploadProgress: (progress: number) => void
  ) => Promise<
    ApiResponse<{
      Path: string;
    }>
  >;
  deleteFunction: (itemId: string, path: string) => void;
}> = ({
  itemId,
  UploadFunction,
  deleteFunction,
  thirdPartySelected = [],
  preSelectedImages
}) => {
    const [images, setImages] = useState<File[]>(thirdPartySelected);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files && files.length > 0) {
        const selectedImages = Array.from(files);

        // Ensure only up to four images are selected
        // if (selectedImages.length <= 4) {
        setImages((prevImages) => {
          // onChange([...prevImages.slice(-3), ...selectedImages]);

          return [...prevImages.slice(-3), ...selectedImages];
        });
        // }
      }
    };

    const removeImage = (index: number, uploadPath?: string) => {
      setImages((prevImages) => {
        prevImages.splice(index, 1);
        return [...prevImages];
      });
      if (uploadPath) deleteFunction(itemId, uploadPath);
    };
    return (
      <>
        <Label weight="bold">Upload Image</Label>
        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5 ">
          <div className="relative h-[138px] w-full cursor-pointer rounded-md border border-dashed border-[#6c7a9326] bg-[#F3F5FB] px-8 py-5 shadow md:w-[138px]">
            <div className="flex flex-col items-center gap-4 ">
              <Plus />
              <P>Upload</P>
            </div>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              multiple
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleImageChange}
            />
          </div>

          {images.map((image, index) => (
            <ImageItem
              UploadFunction={UploadFunction}
              image={image}
              itemId={itemId}
              key={image.name}
              deleteFunction={(path: string) => removeImage(index, path)}
            />
          ))}

          {preSelectedImages.map((item) => (
            <UploadedImageItem
              item={item}
              key={item.Path}
              deleteFunction={deleteFunction}
              itemId={itemId}
            />
          ))}
        </div>
      </>
    );
  };

export default ImageInput;
