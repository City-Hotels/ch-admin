import React from "react";
import { useState } from "react";
import Input from "@/components/formik/input/Input";
import Button from "../Button/Button";
import { IPromotion } from "@/services/promotions/payload";
import { Formik } from "formik";
import { accountInfoSchema } from "@/utils/formSchema";
import TextArea from "../formik/textarea/TextArea";
import { useMutation, useQuery } from "react-query";
import { getMemberships, submitCampaign } from "@/services/promotions";
import queryKeys from "@/utils/api/queryKeys";
import FormProps from "./Account.props";

const AccountInfoForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const initialValues: IPromotion = {
    Name: "",
    Title: "",
    Description: "",
    ShortDescription: "",
    MaxParticipant: 0,
  };

  const handleSubmit = (values: IPromotion) => {
    onSubmit(values);
    setSubmitting(true);
  };

  const { isLoading, refetch, data } = useQuery([queryKeys.getPromotions], () =>
    getMemberships({})
  );
  const memberships = (data?.data.Promotions as IPromotion[]) || [];

  const { mutate, isLoading: loading } = useMutation(submitCampaign);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={accountInfoSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="px-6.5 pt-6">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <Input label="Name" name="Name" className="text-sm" />
                </div>
                <div className="w-full xl:w-1/2">
                  <Input
                    label="Title"
                    title="Title"
                    type="text"
                    name="Title"
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <TextArea
                  name={"ShortDescription"}
                  placeholder="Type your message"
                  className="w-full rounded text-sm border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  title="Short Description"
                  rows={2}
                  label="Short Description"
                />
              </div>

              <div className="mb-6">
                <TextArea
                  rows={6}
                  placeholder="Type your message"
                  className="w-full rounded text-sm border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  label="Description"
                  title="Description"
                  name={"Description"}
                />
              </div>

              <Input
                label="MaxParticipant"
                title="MaxParticipant"
                type="number"
                required
                name={"MaxParticipant"}
                className="w-[6%]"
              />

              <Button
                color="primary"
                size="lg"
                className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90 mb-6"
                type="submit"
                isLoading={isSubmitting}
              >
                Next
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AccountInfoForm;
