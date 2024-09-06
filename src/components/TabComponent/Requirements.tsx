import React from "react";
import Dropdown from "../formik/input/dropdown/Dropdowns";
import { IPromotion } from "@/services/promotions/payload";
import Button from "../Button/Button";
import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import { requirementSchema } from "@/utils/formSchema";
import { useMutation, useQuery } from "react-query";
import { getMemberships, submitCampaign } from "@/services/promotions";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/navigation";
import FormProps from "./Accoout.props";

const Requirements: React.FC<FormProps> = ({ onSubmit }) => {
  const initialValues: IPromotion = {
    Requirement: {
      Location: {
        City: "",
        Country: "",
        PostalCode: "",
        State: "",
        Street: ""
      },
      MaximumBooking: 0,
      MinimumBooking: 0,
      ServiceType: "",
      Account: 0
    },
    Created_at: {
      seconds: 0,
      nanos: 0
    },
    Updated_at: {
      seconds: 0,
      nanos: 0
    }
  };

  const { isLoading, refetch, data } = useQuery([queryKeys.getPromotions], () =>
    getMemberships({})
  );
  const memberships = (data?.data.Promotions as IPromotion[]) || [];


  const router = useRouter();
  const { mutate, isLoading: loading } = useMutation(submitCampaign);

  const handleSubmit = (values: IPromotion) => {
    onSubmit(values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={requirementSchema}
      >
        {({ handleSubmit, errors, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="px-6.5">
                <div className="my-7">
                  <div>
                    <h2 className="font-medium text-black dark:text-white">
                      Location
                    </h2>

                    <div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="City"
                            title="City"
                            typeof="text"
                            required
                            name={"City"}
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="Country"
                            title="Country"
                            typeof="text"
                            required
                            name={"Country"}
                          />
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="PostalCode"
                            title="PostalCode"
                            typeof="text"
                            required
                            name={"PostalCode"}
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="State"
                            title="State"
                            typeof="text"
                            required
                            name={"State"}
                          />
                        </div>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <Input
                          label="Street"
                          title="Street"
                          typeof="text"
                          required
                          name={"Street"}
                        />
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Max number of Bookings"
                    title="Max number of Bookings"
                    required
                    name={"Max number of Bookings"}
                    className="w-[4%]"
                  />

                  <Input
                    label="Min number of Bookings"
                    title="Min number of Bookings"
                    required
                    name={"Min number of Bookings"}
                    className="w-[4%]"
                  />

                  <Input
                    label="Service Type"
                    title="Service Type"
                    typeof="text"
                    required
                    name={"ServiceType"}
                  />
                </div>

                <div className="my-6">
                  <h3 className="font-medium text-black dark:text-white">
                    Account Type
                  </h3>
                  <div className="mb-4.5 flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <label htmlFor="all">All</label>
                      <input
                        type="radio"
                        id="all"
                        name="accountType"
                        value="All"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("accountType", "All")
                        }
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="business">Business</label>
                      <input
                        type="radio"
                        id="business"
                        name="accountType"
                        value="Business"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("accountType", "Business")
                        }
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="apartment">Apartment</label>
                      <input
                        type="radio"
                        id="apartment"
                        name="accountType"
                        value="Apartment"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("accountType", "Apartment")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                color="primary"
                size="lg"
                className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                isLoading={loading}
              >
                Next
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Requirements;
