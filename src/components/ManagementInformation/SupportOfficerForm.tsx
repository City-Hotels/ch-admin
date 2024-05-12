"use client";
import { Formik } from "formik";
import Input from "@/components/formik/input/Input";

import { supportInformationSchema } from "@/utils/formSchema";
import Button from "../Button/Button";
import ManamentInformationFormProps from "./ManamentInformationForm.props";
import { H4, P3 } from "../Headings/Headings";


const SupportOfficerForm: React.FC<ManamentInformationFormProps> = ({ manager, onSubmit, isSubmitting }) => {

  return (
    <div className="rounded-md p-5 md:pr-10">
      <Formik
        initialValues={manager}
        onSubmit={onSubmit}
        validationSchema={supportInformationSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className=" ">
              <H4 className="font-semibold">Support Officer Information</H4>
              <P3>Don&apos;t worry this information will never be shared.</P3>
              <div className="mt-5 flex flex-col gap-3">
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

            <div className="text-center mt-10 md:text-right">
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