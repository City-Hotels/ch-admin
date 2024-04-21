import Button from "@/components/Button/Button";
import Input from "@/components/formik/input/Input";
import Dropdown from "@/components/formik/input/dropdown/Dropdowns";
import TextArea from "@/components/formik/textarea/TextArea";
import { H5, P } from "@/components/Headings/Headings";
import ImageInput from "@/components/inputs/image/Image";
import ToastWrapper from "@/components/toast/Toast";
import {
  addRoomByType,
  deleteRoomMedia,
  getRoomTypes,
  uploadRoomMedia
} from "@/services/room";
import type { ICreateRoomByTypePayload } from "@/services/room/payload";
import { getStateHotel } from "@/store/slice/hotel/hotel.slice";
import queryKeys from "@/utils/api/queryKeys";
import { toastIcons } from "@/utils/constants";
import { addRoomByTypeSchema } from "@/utils/formSchema";
import { Formik } from "formik";
import router from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

const ImagesForm: React.FC<{ roomId: string }> = ({ roomId }) => {
  return (
    <div className="relative min-h-[450px] p-5">
      <ImageInput
        itemId={roomId}
        preSelectedImages={[]}
        UploadFunction={uploadRoomMedia}
        deleteFunction={deleteRoomMedia}
      />
      <div className="absolute bottom-5 w-full pr-10 text-right">
        <Button
          color="text"
          variant="text"
          size="md"
          onClick={() => router.push("/hotel/rooms")}
          className="text-center"
        >
          <P> See all rooms</P>
        </Button>
      </div>
    </div>
  );
};

const NewRoomsModal = () => {
  const hotel = useSelector(getStateHotel);
  const { data } = useQuery([queryKeys.getRoomType], () =>
    getRoomTypes({ HotelId: hotel?.Id })
  );
  const roomsTypes = data?.data.RoomTypes;
  const { mutate, isLoading } = useMutation(addRoomByType);

  const roomOptions = [
    { label: "Select room type", value: "" },
    ...(roomsTypes?.map((item) => ({ label: item.Name, value: item.Id })) || [])
  ];

  const [roomId, setRoomId] = useState("");

  const onFormSubmit = (values: ICreateRoomByTypePayload) => {
    mutate(values, {
      onSuccess(response) {
        setRoomId(response.data.RoomId);
        toast.success(
          (t) => <ToastWrapper message={response?.message} t={t} />,
          {
            icon: toastIcons.success
          }
        );
      }
    });
  };

  const initialValues: ICreateRoomByTypePayload = {
    TypeId: "",
    Name: "",
    Description: ""
  };

  return (
    <div>
      {!roomId ? (
        <section className="mx-2 my-4 md:mx-10 md:my-8">
          <H5 className="mb-6 text-left font-semibold capitalize text-black md:text-center">
            Add a new Room
          </H5>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            validationSchema={addRoomByTypeSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <Dropdown
                    options={roomOptions}
                    onChange={() => { }}
                    name="TypeId"
                    label="Room Type"
                  />
                </div>

                <Input name="Name" label="Room Name" placeholder="" />

                <TextArea
                  name="Description"
                  label="What's unique to this room"
                  placeholder="Optional"
                />
                <Button
                  color="primary"
                  size="lg"
                  isLoading={isLoading}
                  type="submit"
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </section>
      ) : (
        <ImagesForm roomId={roomId} />
      )}
    </div>
  );
};

export default NewRoomsModal;
