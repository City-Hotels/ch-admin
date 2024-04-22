import Button from "@/components/Button/Button";
import { P, Label } from "@/components/Headings/Headings";
import { useCallback, useState } from "react";
import CropIcon from "@/assets/icons/crop.svg";
import Filter from "@/assets/icons/filter.svg";
import Adjust from "@/assets/icons/adjust.svg";
import File from "@/assets/icons/file.svg";
import ReactCrop, { type Crop } from "react-image-crop";

import Img from "@/components/Image/Image";
import Input from "@/components/Inputs/Input/Input";

import "react-image-crop/dist/ReactCrop.css";

interface FormProps {
  onSubmit: Function;
  previousBanner?: string;
}

const MediaForm: React.FC<FormProps> = ({ onSubmit, previousBanner }) => {
  const [bannerAction, setBannerAction] = useState<
    "crop" | "filter" | "adjust" | undefined
  >();
  const [selectedBanner, setSelectedBanner] = useState<File | undefined>();
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);

  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Use '%' or 'px'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [croppedImage, setCroppedImage] = useState("");

  const getCroppedImage = useCallback(
    (updatedCrop: Crop) => {
      const image = document.createElement("img");
      image.src = selectedBanner
        ? URL.createObjectURL(selectedBanner)
        : "/croppedBanner.png"; // Replace with your image source

      const canvas = document.createElement("canvas");
      canvas.width = updatedCrop.width;
      canvas.height = updatedCrop.height;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(
        image,
        updatedCrop.x,
        updatedCrop.y,
        updatedCrop.width,
        updatedCrop.height,
        0,
        0,
        updatedCrop.width,
        updatedCrop.height
      );

      const croppedImageUrl = canvas.toDataURL("image/jpeg"); // You can change the output format if needed
      setCroppedImage(croppedImageUrl);
    },
    [selectedBanner]
  );

  function dataUrlToBlob(dataUrl: string): Blob {
    const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
    if (!matches) {
      throw new Error("Invalid data URL format");
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const byteCharacters = atob(base64Data || "");
    const byteNumbers = new Array(byteCharacters.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  function dataUrlToFile(dataUrl: string, filename: string): File {
    const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
    if (!matches) {
      throw new Error("Invalid data URL format");
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const byteString = atob(base64Data || "");
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  }

  const onCropComplete = (updatedCrop: Crop) => {
    if (updatedCrop.width && updatedCrop.height) {
      getCroppedImage(updatedCrop);
    }
  };

  const saveBannerEditSettings = () => {
    if (bannerAction === "crop") {
      setSelectedBanner(dataUrlToFile(croppedImage, "banner"));
      const data = new FormData();
      data.append(
        "file",
        dataUrlToBlob(croppedImage),
        `banner_${new Date().getTime()}.png`
      );
      onSubmit(data, setBannerUploadProgress).then(() => {
        setBannerAction(undefined);
      });
    } else if (selectedBanner) {
      const data = new FormData();
      data.append("file", selectedBanner, `banner_${new Date().getTime()}.png`);
      onSubmit(data, setBannerUploadProgress).then(() => {
        setBannerAction(undefined);
      });
    }
  };

  const clickCrop = () => {
    setBannerAction("crop");
  };

  const clickFilter = () => {
    setBannerAction("filter");
  };

  const clickAdjust = () => {
    setBannerAction("adjust");
  };

  const onSelectedBanner = (e: any) => {
    const file = e.target.files[0];
    setSelectedBanner(file);
  };

  return (
    <div className="w-full  pb-[50.5px]">
      <div className="">
        <div className="">
          {bannerAction === "crop" ? (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={onCropComplete}
            >
              <Img
                name="Banner"
                path={
                  croppedImage ||
                  (selectedBanner
                    ? URL.createObjectURL(selectedBanner)
                    : "/croppedBanner.png")
                }
                className="h-[200px] w-full"
              />
            </ReactCrop>
          ) : (
            <Img
              name="Banner"
              path={
                croppedImage ||
                (selectedBanner
                  ? URL.createObjectURL(selectedBanner)
                  : previousBanner || "/croppedBanner.png")
              }
              className="h-[200px] w-full"
            />
          )}
        </div>

        <div>
          <div className=" mt-8 flex gap-9">
            <div
              onClick={clickCrop}
              className={` ${bannerAction === "crop" &&
                "border-b-2 border-b-primary400 text-primary400"
                } flex cursor-pointer gap-3`}
            >
              <CropIcon />
              <P className="text-[16px]">Crop</P>
            </div>

            <div
              onClick={clickFilter}
              className={` ${bannerAction === "filter" &&
                "border-b-2 border-b-primary400 text-primary400"
                } flex cursor-pointer gap-3`}
            >
              <Filter />
              <P className="text-[16px]">Filter</P>
            </div>

            <div
              onClick={clickAdjust}
              className={` ${bannerAction === "adjust" &&
                "border-b-2 border-b-primary400 text-primary400"
                } flex cursor-pointer gap-3`}
            >
              <Adjust />
              <P className="text-[16px]">Adjust</P>
            </div>
          </div>
          <div className="mb-10 py-5">
            {bannerAction === "crop" && (
              <div>
                <div className="flex gap-5">
                  <div>
                    <Input
                      type="number"
                      label="Width:"
                      value={crop.width}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCrop({ ...crop, width: parseFloat(target.value) });
                      }}
                    />
                    <Input
                      type="number"
                      label="Height:"
                      value={crop.height}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCrop({ ...crop, height: parseFloat(target.value) });
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      label="X:"
                      value={crop.x}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCrop({ ...crop, x: parseFloat(target.value) });
                      }}
                    />
                    <Input
                      type="number"
                      label="Y:"
                      value={crop.y}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setCrop({ ...crop, y: parseFloat(target.value) });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {bannerAction === "filter" && <div>Filter Feature</div>}

            {bannerAction === "adjust" && <div>Adjust Feature</div>}
          </div>

          {bannerUploadProgress > 0 && <div>{bannerUploadProgress}%</div>}

          <div className="flex items-center justify-between">
            <Button
              color="text"
              disabled={!selectedBanner}
              onClick={() => setSelectedBanner(undefined)}
              className="cursor-pointer text-[16px] text-[#FF0000]"
            >
              Delete Image
            </Button>

            <div className="flex items-center gap-2">
              <Button type="button" color="media" size="lg" outline>
                <Label htmlFor="imageUpload">
                  {selectedBanner ? "Change" : "Choose"} Photo
                </Label>
                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  onChange={onSelectedBanner}
                />
              </Button>

              <Button
                size="md"
                color="primary"
                onClick={saveBannerEditSettings}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaForm;
