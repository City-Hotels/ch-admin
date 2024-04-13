import React, { useState } from "react";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import Dropdown from "../formik/input/dropdown/Dropdowns";
import { IPromotion } from "@/services/promotions/payload";
import Button from "../Button/Button";
import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import { requirementSchema } from "@/utils/formSchema";

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

const onProceed = (values: IPromotion) => {
  console.log(values);
};


const Requirements = () => {
  const [options, setOptions] = useState("0");
  const [options2, setOptions2] = useState("0");
  const [options3, setOptions3] = useState("0");
  const updateRequirments = (options: string) => {
    setOptions(options);
  };
  const updateMaxBookings = (options: string) => {
    setOptions2(options);
  };
  const updateMinBookings = (options: string) => {
    setOptions3(options);
  };

  const Requiremnets = [
    {
      label: "Standard",
      value: options
    },

    {
      label: "Premium",
      value: options
    },

    {
      label: "Executive",
      value: options
    }
  ];

  const MaxBookings = [
    {
      label: "0",
      value: options2
    },

    {
      label: "5",
      value: options2
    },

    {
      label: "10",
      value: options2
    }
  ];

  const MinBookings = [
    {
      label: "0",
      value: options3
    },

    {
      label: "2",
      value: options3
    },

    {
      label: "5",
      value: options3
    }
  ];
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onProceed}
        validationSchema={requirementSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="my-7">
                <Dropdown
                  options={Requiremnets}
                  name={"Requiremnets"}
                  label=" Max Number of Requiremnets"
                  className="mb-9 w-full"
                  onChange={() => updateRequirments}
                />
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

                <Dropdown
                  options={MaxBookings}
                  name={"Max number of Bookings"}
                  label=" Max Number of Bookings"
                  className="mb-9 w-full"
                  onChange={() => updateMaxBookings}
                />

                <Dropdown
                  options={MinBookings}
                  name={"Min number of Bookings"}
                  label=" Min Number of Bookings"
                  className="mb-9 w-full"
                  onChange={() => updateMinBookings}
                />

                <Input
                  label="Service Type"
                  title="Service Type"
                  typeof="text"
                  required
                  name={"ServiceType"}
                />
              </div>
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

export default Requirements;
