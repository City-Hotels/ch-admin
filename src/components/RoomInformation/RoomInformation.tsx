import { roomInformationSchema } from "@/utils/formSchema";
import Input from "@/components/formik/input/Input";
import { Formik } from "formik";

import { H4 } from "../Headings/Headings";
import Button from "../Button/Button";
import { IRoom, IRoomInformationPayload } from "@/services/room/payload";

export interface RoomInformationFormProps {
  onSubmit: (values: IRoomInformationPayload) => void;
  room: IRoom;
  isSubmitting: boolean;
}

const RoomInformationForm: React.FC<RoomInformationFormProps> = ({ onSubmit, room, isSubmitting }) => {
  const initialValues: IRoomInformationPayload = {
    Name: room?.Name || "",
    Description: room?.Description || "", 
  };

  return (
    <div className="flex flex-col gap-20 rounded-md bg-white p-5 shadow-md md:pr-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={roomInformationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="">
              <H4 className="font-semibold">Room Information</H4>

              <div className="mt-10">
                <div>
                  <Input label="Name" name="Name" />
                  <Input label="Description" name="Description" />
                </div>
              </div>
              <div className="text-center md:text-right">
                <Button
                  className="mt-5"
                  type="submit"
                  color="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RoomInformationForm;
