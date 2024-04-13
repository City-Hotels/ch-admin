import React from "react";
import { useState } from "react";
import Input from "@/components/formik/input/Input";
import Button from "../Button/Button";
import { IPromotion } from "@/services/promotions/payload";
import { Formik } from "formik";
import { accountInfoSchema } from "@/utils/formSchema";
import TextArea from "../formik/textarea/TextArea";
import Dropdown from "../formik/input/dropdown/Dropdowns";

const initialValues: IPromotion = {
  Name: "",
  Title: "",
  Description: "",
  ShortDescription: "",
  MaxParticipant: 0,
  Created_at: {
    seconds: 0,
    nanos: 0
  },
  Updated_at: {
    seconds: 0,
    nanos: 0
  }
};

const onProceed = (values: IPromotion) => {
  console.log(values);
};

const PersonalInfo = () => {
  const [options, setOptions] = useState("0");
  const updateMaxParticipant = (options: string) => {
    setOptions(options);
  };

  const maxNoParticipan2 = [
    {
      label: "0",
      value: options
    },

    {
      label: "1",
      value: options
    },

    {
      label: "2",
      value: options
    }
  ];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onProceed}
        validationSchema={accountInfoSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <Input label="Name" name="Name" />
                </div>
                <div className="w-full xl:w-1/2">
                  <Input
                    label="Title"
                    title="Title"
                    typeof="text"
                    name="Title"
                  />
                </div>
              </div>

              <div className="mb-6">
                <TextArea
                  name={"ShortDescription"}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  typeof="text"
                  title="Short Description"
                  rows={2}
                  label="Short Description"
                />
              </div>

              <div className="mb-6">
                <TextArea
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  typeof="text"
                  label="Description"
                  title="Description"
                  name={"Description"}
                />
              </div>

              <Dropdown
                options={maxNoParticipan2}
                name={"MaxParticipant"}
                label=" Max Number of Participant"
                className="mb-9 w-full"
                onChange={() => updateMaxParticipant}
              />
            </div>

            <Button
              color="primary"
              size="lg"
              className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Next
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
