import React from 'react'
import SelectGroupOne from '../SelectGroup/SelectGroupOne';
import Input from "@/components/Inputs/Input/input-3";

const maxNoBookings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const minNoBookings = [1, 2, 3, 4, 5];

const Requirements = () => {
  return (
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
  )
}

export default Requirements