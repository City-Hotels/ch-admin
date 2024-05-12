import type { HotelInformationPayload, IHotel } from "@/services/hotel/payload";

import { hotelInformationSchema } from "@/utils/formSchema";
import Input from "@/components/formik/input/Input";
import { Formik } from "formik";


import TextArea from "@/components/formik/textarea/TextArea";
import type { AppDispatch } from "@/store";
import { H4 } from "../Headings/Headings";
import Button from "../Button/Button";

export interface HotelInformationFormProps {
  onSubmit: (values: HotelInformationPayload) => void;
  hotel: IHotel;
  isSubmitting: boolean;
}

const HotelInformation: React.FC<HotelInformationFormProps> = ({ onSubmit, hotel, isSubmitting }) => {
  const initialValues: HotelInformationPayload = {
    Name: hotel?.Name || "",
    Slogan: hotel?.Slogan || "",
    Email: hotel?.Email || "",
    Introduction: hotel?.Introduction || "",
    Telephone: hotel?.Telephone || ""
  };

  return (
    <div className="flex flex-col gap-20 rounded-md bg-white p-5 shadow-md md:pr-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={hotelInformationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="">
              <H4 className="font-semibold">Basic Information</H4>

              <div className="mt-10">
                <div>
                  <Input label="Name" name="Name" />
                  <Input label="Email" name="Email" />
                  <Input label="Telephone" name="Telephone" />
                  <Input
                    label="Slogan"
                    name="Slogan"
                    placeholder="e.g Best hotel in lagos"
                  />
                  <TextArea
                    label="Introduction"
                    name="Introduction"
                    placeholder="Short welcome to the hotel"
                  />
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

export default HotelInformation;
