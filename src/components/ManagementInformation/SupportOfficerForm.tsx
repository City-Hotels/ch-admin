import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import type { SupportInformationPayload } from "@/services/hotel/payload";

import { supportInformationSchema } from "@/utils/formSchema";
import Button from "../Button/Button";
import ManamentInformationFormProps from "./ManamentInformationForm.props";
import { H4, P3 } from "../Headings/Headings";


const SupportOfficerForm: React.FC<ManamentInformationFormProps> = ({ manager, onSubmit, isSubmitting }) => {

  const initialValues: SupportInformationPayload = {
    Firstname: manager?.Firstname || "",
    Lastname: manager?.Lastname || "",
    Email: manager?.Email || "",
    Telephone: manager?.Telephone || ""
  };

  return (
    <div className="rounded-md p-5 md:pr-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={supportInformationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className=" ">
              <H4 className="font-semibold">Support Officer Information</H4>
              <P3>Don&apos;t worry this information will never be shared.</P3>
              <div className="mt-10">
                <Input
                  className="rounded-lg"
                  label="Firstname"
                  name="Firstname"
                />
                <Input
                  className="rounded-lg"
                  label="Lastname"
                  name="Lastname"
                />
                <Input
                  className="rounded-lg"
                  label="Email Address"
                  name="Email"
                />
                <Input
                  className="rounded-lg"
                  label="Phone Number"
                  name="Telephone"
                />
              </div>
            </div>

            <div className="text-center md:text-right">
              <Button
                className=""
                type="submit"
                color="primary"
                size="md"
                isLoading={isSubmitting}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}


export default SupportOfficerForm;