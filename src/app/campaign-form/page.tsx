import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Input from "@/components/Inputs/Input/input-3";
import Radio from "@/components/Inputs/radio/Radio";
import DateInput from "@/components/Inputs/dateInput/DateInput";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";

export const metadata: Metadata = {
  title: "Next.js Form Layout | CHB Admin - Dashboard",
  description:
    " Form Layout page for CHB Admin - Next.js Tailwind CSS Admin Dashboard Template"
};

const maxNoParticipant = [0, 2, 5, 8];
const maxNoBookings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const minNoBookings = [1, 2, 3, 4, 5];

const FormLayout = () => {
  return (
    <DefaultLayout>
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h1 className="font-medium text-black dark:text-white">
                Campaign Form
              </h1>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Input label="Name" title="Name" typeof="text" required />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <Input label="Title" title="Title" typeof="text" required />
                  </div>
                </div>

                <SelectGroupOne
                  disabled="Select Max number of Participant"
                  className="mb-9"
                  label="Max Participant"
                  options={maxNoParticipant}
                />

                <div>
                  <h2 className="font-medium text-black dark:text-white">
                    Pricing
                  </h2>

                  <div className="mb-4.5">
                    <Input
                      label="Booking Discount"
                      title="Booking Discount"
                      typeof="number"
                      required
                    />
                  </div>
                  <div></div>
                  <div className="mb-4.5">
                    <Input label="Rate" title="Rate" typeof="number" required />
                  </div>
                  <div className="mb-4.5">
                    <Input label="Unit" title="Unit" typeof="text" required />
                  </div>

                  <div className="my-6">
                    <h3 className="font-medium text-black dark:text-white">
                      Pricing Type
                    </h3>
                    <div className="mb-4.5 flex items-center gap-3">
                      {/* <Radio
                      label={"Standard"}
                      value={undefined}
                      name={"Standard"}
                    />
                    <Radio
                      label={"Premium"}
                      value={undefined}
                      name={"Premium"}
                    /> */}

                      <div className="flex items-center gap-3">
                        <label>Standard</label>
                        <input
                          type="radio"
                          title="promotion type"
                          name="radio"
                          value={"Standard"}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <label>Premimum</label>
                        <input
                          type="radio"
                          name="radio"
                          title="promotion type"
                          value={"Standard"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-7">
                  <h2 className="font-medium text-black dark:text-white">
                    Requirements
                  </h2>

                  <div className="mb-4.5 flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <label>Standard</label>
                      <input
                        type="radio"
                        title="promotion type"
                        name="radio"
                        value={"Standard"}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label>Premimum</label>
                      <input
                        type="radio"
                        name="radio"
                        title="promotion type"
                        value={"Standard"}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label>Premimum</label>
                      <input
                        type="radio"
                        name="radio"
                        title="promotion type"
                        value={"Standard"}
                      />
                    </div>
                  </div>

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
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="Country"
                            title="Country"
                            typeof="text"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="Latitude"
                            title="Latitude"
                            typeof="text"
                            required
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="Longitude"
                            title="Longitude"
                            typeof="text"
                            required
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
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <Input
                            label="State"
                            title="State"
                            typeof="text"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full xl:w-1/2">
                        <Input
                          label="Street"
                          title="Street"
                          typeof="text"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <SelectGroupOne
                    disabled="Select Maximumm number of Bookings"
                    className="mb-9"
                    label="Maximum Bookings"
                    options={maxNoBookings}
                  />

                  <SelectGroupOne
                    disabled="Select Minimum number of Bookings"
                    className="mb-9"
                    label="Minimum Bookings"
                    options={minNoBookings}
                  />

                  <Input
                    label="Service Type"
                    title="Service Type"
                    typeof="text"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    typeof="text"
                    title="Short Description"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    typeof="text"
                    title="Description"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
