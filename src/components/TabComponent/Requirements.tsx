import React from "react";
import { IPromotion } from "@/services/promotions/payload";
import Button from "../Button/Button";
import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import { requirementSchema } from "@/utils/formSchema";
import FormProps from "./Account.props";

const Requirements: React.FC<FormProps> = ({ onSubmit, formInput }) => {


  const handleSubmit = (values: IPromotion) => {
    onSubmit(values);
  };

  return (
    <div>
      <Formik
        initialValues={formInput}
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
                            type="text"
                            required
                            name={"Requirement.Location.City"}
                            className="text-sm"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="Country"
                            title="Country"
                            type="text"
                            required
                            name={"Requirement.Location.Country"}
                            className="text-sm"
                          />
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="PostalCode"
                            title="PostalCode"
                            type="text"
                            required
                            name={"Requirement.Location.PostalCode"}
                            className="text-sm"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="State"
                            title="State"
                            type="text"
                            required
                            name={"Requirement.Location.State"}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <Input
                          label="Street"
                          title="Street"
                          type="text"
                          required
                          name={"Requirement.Location.Street"}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Max number of Bookings"
                    title="Max number of Bookings"
                    type="number"
                    required
                    name={"Requirement.MaximumBooking"}
                    className="w-[8%]"
                  />

                  <Input
                    label="Min number of Bookings"
                    title="Min number of Bookings"
                    type="number"
                    required
                    name={"Requirement.MinmumBooking"}
                    className="w-[8%]"
                  />

                  <Input
                    label="Service Type"
                    title="Service Type"
                    type="text"
                    name={"Requirement.ServiceType"}
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
                        name={"Requirement.Account"}
                        value="All"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("Requirement.Account", 0)
                        }
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="business">Business</label>
                      <input
                        type="radio"
                        id="business"
                        name={"Requirement.Account"}
                        value="Business"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("Requirement.Account", 1)
                        }
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label htmlFor="apartment">Apartment</label>
                      <input
                        type="radio"
                        id="apartment"
                        name={"Requirement.Account"}
                        value="Apartment"
                        onChange={(ev) =>
                          ev.currentTarget.checked &&
                          setFieldValue("Requirement.Account", 2)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button
                  color="primary"
                  size="lg"
                  className="flex w-full justify-center rounded bg-primary400 p-3 font-medium text-gray hover:bg-opacity-90 mb-6"
                  type="submit"
    
                >
                  Next
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Requirements;
