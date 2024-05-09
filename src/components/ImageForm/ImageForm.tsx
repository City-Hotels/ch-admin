import DeleteIcon from "@/assets/icons/delete-small.svg";
import FastForwardIcon from "@/assets/icons/fast-forward.svg";
import NoImageIcon from "@/assets/icons/no-image.svg";
import EditIcon from "@/assets/icons/pencil.svg";
import PlusCircleIcon from "@/assets/icons/plus-circle.svg";
import { P } from "@/components/Headings/Headings";
import type { IMedia } from "@/services/apartment/payload";
import type { ApiResponse } from "@/utils/api/calls";
import { fileListToArray } from "@/utils/helpers";
import React from "react";
import ImageInput from "../Inputs/image/Image";
import styles from "./ImageForm.module.scss";
import Image from "next/image";

const DropzoneInput: React.FC<{ onSelectFiles: (files: FileList) => void }> = ({
  onSelectFiles
}) => {
  return (
    <div className="flex h-[337px] w-[350px] flex-col items-center justify-center rounded-md border border-dashed border-white900 md:w-[450px] lg:w-[585px]">
      <input
        type="file"
        name="file"
        onChange={(e) => e.target.files && onSelectFiles(e.target.files)}
        accept=".jpg,.jpeg,.png"
        className="absolute size-full  opacity-0"
        multiple
      />
      <PlusCircleIcon />
      <span className="font-circular text-[16px] font-[450]">Upload</span>
      <P className="text-white700">Choose at least 5 photos</P>
    </div>
  );
};

const FilePreview: React.FC<{
  file?: File;
  uploadedPath?: string;
  className: string;
  onDelete: Function;
  uploadPercentage: number;
  onSelectFiles: (files: FileList) => void;
}> = ({ file, className, uploadedPath, onDelete, onSelectFiles }) => {
  return (
    <div>
      {file || uploadedPath ? (
        <div className={`relative ${className}`}>
          <Image
            src={file ? URL.createObjectURL(file) : uploadedPath || ""}
            alt="Selected Image"
            className="z-0 max-h-full w-full object-cover"
          />
          <div className={styles.editIconWrapper}>
            <div className={styles.editIcons}>
              <FastForwardIcon className={styles.icon} />
              <span onClick={() => onDelete()}>
                <DeleteIcon className={styles.icon} />
              </span>
              <EditIcon className={styles.icon} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex size-full items-center justify-center">
          <NoImageIcon />
          <input
            type="file"
            name="file"
            onChange={(e) => e.target.files && onSelectFiles(e.target.files)}
            accept=".jpg,.jpeg,.png"
            className="absolute size-full  opacity-0"
            multiple
          />
        </div>
      )}
    </div>
  );
};

const ImagePreview: React.FC<{
  uploaded: IMedia[];
  onSelected: (
    itemId: string,
    data: FormData,
    setProgress: (progress: number) => void
  ) => Promise<
    ApiResponse<{
      Path: string;
    }>
  >;
  onDelete: (mediaId: string) => void;
  uploadPercentage: number;
  images: File[];
  itemId?: string;
  fileSelected: (files: FileList) => void;
}> = ({
  uploadPercentage,
  fileSelected,
  images,
  uploaded,
  onDelete,
  onSelected,
  itemId
}) => (
    <div>
      <FilePreview
        uploadPercentage={uploadPercentage}
        onSelectFiles={fileSelected}
        file={images ? images[0] : undefined}
        uploadedPath={uploaded ? uploaded[0]?.Path : ""}
        className="mb-4  w-full md:h-80"
        onDelete={() => onDelete && onDelete(uploaded[0] ? uploaded[0].Path : "")}
      />
      <ImageInput
        UploadFunction={onSelected}
        preSelectedImages={uploaded || []}
        itemId={itemId || ""}
        deleteFunction={onDelete}
        thirdPartySelected={images}
      />
    </div>
  );

const ImageForm: React.FC<{
  itemId?: string;
  selected?: FileList;
  uploaded: IMedia[];
  onSelected: (
    itemId: string,
    data: FormData,
    setProgress: (progress: number) => void
  ) => Promise<
    ApiResponse<{
      Path: string;
    }>
  >;
  onDelete: (mediaId: string) => void;
}> = ({ itemId = "", onSelected, selected, uploaded, onDelete }) => {
  const [uploadPercentage, setUploadPicture] = React.useState(0);
  const [images, setImages] = React.useState<File[]>(
    (selected && fileListToArray(selected)) || []
  );

  const fileSelected = (files: FileList) => {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (file) {
        const form = new FormData();
        form.append("file", file);
        onSelected(itemId, form, (progress) => setUploadPicture(progress));
      }
    }
  };

  const hasImages = images && images.length > 0;
  const hasUploaded = uploaded && uploaded.length > 0;

  return (
    <div className="relative">
      {hasImages || hasUploaded ? (
        <ImagePreview
          onDelete={onDelete}
          uploaded={uploaded}
          onSelected={onSelected}
          uploadPercentage={uploadPercentage}
          images={images}
          itemId={itemId}
          fileSelected={fileSelected}
        />
      ) : (
        <DropzoneInput
          onSelectFiles={(files) => setImages(fileListToArray(files))}
        />
      )}
    </div>
  );
};

export default ImageForm;
