import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import type { SupportInformationPayload } from "@/services/hotel/payload";
import { managementInformationSchema } from "@/utils/formSchema";
import ManamentInformationFormProps from "./ManamentInformationForm.props";
import { H4, P3 } from "../Headings/Headings";
import Button from "../Button/Button";

const ManagerForm: React.FC<ManamentInformationFormProps> = ({ manager, onSubmit, isSubmitting }) => {

  const initialValues: SupportInformationPayload = {
    Firstname: manager?.Firstname || "",
    Lastname: manager?.Lastname || "",
    Email: manager?.Email || "",
    Telephone: manager?.Telephone || ""
  };

  return (
    <div className="p-5  md:pr-10">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={managementInformationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="">
              <H4 className="mb-2 font-semibold">Manager Information</H4>
              <P3>Don&apos;t worry this information will never be shared.</P3>
              <div className="mt-10 flex w-full gap-5">
                <div className="basis-1/2">
                  <Input
                    className="rounded-lg"
                    label="First Name"
                    name="Firstname"
                  />
                </div>
                <div className="basis-1/2">
                  <Input
                    className="basis-1/2 rounded-lg"
                    label="Last Name"
                    name="Lastname"
                  />
                </div>
              </div>
              <Input className="rounded-lg" label="Email " name="Email" />
              <Input
                className="rounded-lg"
                label="Telephone"
                name="Telephone"
              />
            </div>

            <div className="mt-5 text-center md:text-right">
              <Button
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
export default ManagerForm;
