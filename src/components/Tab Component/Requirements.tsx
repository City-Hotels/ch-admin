import React from "react";
import Dropdown from "../formik/input/dropdown/Dropdowns";
import { IPromotion } from "@/services/promotions/payload";
import Button from "../Button/Button";
import { Formik } from "formik";
import Input from "@/components/formik/input/Input";
import { requirementSchema } from "@/utils/formSchema";
import { useQuery } from "react-query";
import { getMemberships } from "@/services/promotions";
import queryKeys from "@/utils/api/queryKeys";

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

const Requirements = () => {
  const { isLoading, refetch, data } = useQuery([queryKeys.getPromotions], () =>
    getMemberships({})
  );
  const memberships = (data?.data.Promotions as IPromotion[]) || [];


  const maxMembershipBookings = memberships.flatMap((item) => ({
    label: String(item.Requirement?.MaximumBooking),
    value: String(item.Id)
  }));

  const minMembershipBookings = memberships.map((item) => ({
    label: String(item.Requirement?.MinimumBooking ?? "no value"),
    value: String(item.Id)
  }));

  const onProceed = (values: IPromotion) => {
    
  };

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
                  options={maxMembershipBookings}
                  name={"Max number of Bookings"}
                  label=" Max Number of Bookings"
                  className="mb-9 w-full"
                />

                <Dropdown
                  options={minMembershipBookings}
                  name={"Min number of Bookings"}
                  label=" Min Number of Bookings"
                  className="mb-9 w-full"
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
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label htmlFor="business">Business</label>
                    <input
                      type="radio"
                      id="business"
                      name="accountType"
                      value="Business"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label htmlFor="apartment">Apartment</label>
                    <input
                      type="radio"
                      id="apartment"
                      name="accountType"
                      value="Apartment"
                    />
                  </div>
                </div>
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
