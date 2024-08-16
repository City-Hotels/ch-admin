import Button from "@/components/Button/Button";
import { H5 } from "@/components/Headings/Headings";
import React from "react";
import Input from "@/components/formik/input/Input";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import toast from "react-hot-toast";
import type { IRoomType } from "@/services/room/payload";
import {
  addRoomType
  // deleteRoomTypeMedia,
  // uploadRoomTypeMedia
} from "@/services/room";
import { addRoomTypeSchema } from "@/utils/formSchema";
import Dropdown from "@/components/formik/input/dropdown/Dropdowns";
import { useMutation } from "react-query";
// import ImageInput from "@/components/inputs/image/Image";

const RoomTypeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // const [roomTypeId, setRoomTypeId] = useState("");
  const options = ["Executive", "Standard", "elegant rooms"];
  const cancellationOptions = ["Policy1", "Policy2", "Policy3"];
  const facilityOptions = ["Wifi", "Laundry", "Swimming Pool", "AC", "Shower"];

  const roomOptions = options.map((item) => ({ label: item, value: item }));
  const policyOptions = cancellationOptions.map((item) => ({
    label: item,
    value: item
  }));

  const Options = facilityOptions.map((item) => ({
    label: item,
    value: item
  }));

  const { mutate, isLoading } = useMutation(addRoomType);

  const onSubmit = (
    values: IRoomType,
    formikHelpers: FormikHelpers<IRoomType>
  ) => {
    mutate(values, {
      onSuccess(data) {
        // setRoomTypeId(data.data.Id);
        toast.success((t) => <ToastWrapper message={data?.message} t={t} />, {
          icon: toastIcons.success
        });
        formikHelpers.resetForm();
        onClose();
      }
    });
  };

  const initialValues: IRoomType = {
    Name: "",
    StandardType: "",
    CancellationPolicy: "",
    MaxAdults: 0,
    MaxChildren: 0,
    Bed: "",
    Published_at: "",
    Description: "",
    HotelId: "",
    Id: "",
    MaxGuest: 0,
    NumberAvailable: 0,
    MaxBedRoom: 0,
    BedCount: 0,
    BathCount: 0,
    CarPark: false,
    Dimension: 0,
    Medias: [],
    Facilities: [],
    Pricing: {
      Price: 0,
      PromoCost: 0,
      PromoCode: "",
      Refundable: false,
      RefundPeriod: 0,
      PrePayment: false,
      Quantity: 0,
      CancellationFee: 0,
      NumberAvailable: 0,
      WeeklyRate: 0,
      MonthlyRate: 0
    },
    Slug: "",
    Status: 0
  };

  return (
    <div>
      <section className="mx-2 my-4 md:mx-10 ">
        <H5 className="mb-6 text-left font-semibold capitalize text-black md:text-center">
          Add a Room Type
        </H5>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={addRoomTypeSchema}
        >
          {({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <Input name="Title" label="Title" />

                  <Dropdown
                    options={policyOptions}
                    label="Cancellation Policy"
                    name="CancellationPolicy"
                  />
                  <Dropdown
                    name="StandardType"
                    label="Type"
                    options={roomOptions}
                  />

                  <Input name="MinOccupants" label="Min. Number of Occupants" />
                  <Input name="MaxOccupants" label="MAX. Number of Occupants" />

                  <Input name="BasePrice" label=" BasePrice" />

                  <Dropdown
                    label="Facilities"
                    name="Facilitie"
                    options={Options}
                    onChange={() => { }}
                  />

                  {/* <div>
                    <ImageInput
                      itemId={roomTypeId}
                      preSelectedImages={[]}
                      UploadFunction={uploadRoomTypeMedia}
                      deleteFunction={deleteRoomTypeMedia}
                    />
                  </div> */}
                  <div className="text-end ">
                    <Button
                      color="primary"
                      size="md"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </section>
    </div>
  );
};

export default RoomTypeModal;
