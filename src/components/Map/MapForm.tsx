import LocationIcon from "@/assets/icons/location.svg";
import React, { useEffect, useState } from "react";
import type { ICity, ILocation } from "@/services/location/payload";
import { Formik } from "formik";
import queryKeys from "@/utils/api/queryKeys";
import { useQuery } from "react-query";
import { getLocation } from "@/services/location";
import { verifyAddressSchema } from "@/utils/formSchema";
import { CountryOptions } from "@/utils/constants";
import Input from "../formik/input/Input";
import Dropdown from "../formik/input/dropdown/Dropdowns";
import Button from "../Button/Button";
import { H3, H5, P } from "../Headings/Headings";
import Map from "./Map";
import UserMap from "./LocationForm/LocationForm";

const Form1: React.FC<{
  setAddress: (address: ILocation) => void;
  address: ILocation;
  onCancel: () => void;
}> = ({ address, setAddress }) => {
  return (
    <>
      <H5 className="my-5">Your location on map</H5>
      <UserMap
        icon={LocationIcon}
        description="Festac"
        value={address}
        onSelectLocation={setAddress}
      />
    </>
  );
};

const Form2: React.FC<{
  setAddress: (address: ILocation) => void;
  address: ILocation;
  onCancel: () => void;
}> = ({ address, setAddress, onCancel }) => {
  const [cities, setCities] = useState<ICity[]>([]);

  const { data } = useQuery([queryKeys.getLocation], () => getLocation(""));
  const states = data?.data?.Locations[0]?.Country.States || [];

  const initialValues: ILocation = {
    City: address?.City || "",
    Country: address?.Country || "",
    Latitude: address?.Latitude || "",
    Longitude: address?.Longitude || "",
    PostalCode: address?.PostalCode || "",
    State: address?.State || "",
    Street: address?.Street || ""
  };

  const onFormSubmit = (values: ILocation) => {
    setAddress(values);
  };

  const onSelectState = (state: string) => {
    setCities(states.find((item) => item.Name === state)?.Cities || []);
  };

  useEffect(() => {
    setCities(
      states.find((item) => item.Name === address?.State)?.Cities || []
    );

    return () => { };
  }, [address?.State, states]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={verifyAddressSchema}
      >
        {({ handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col lg:mt-5"
          >
            <H3 className="mb-2 hidden text-center lg:block">
              Confirm your address
            </H3>
            <P className="text-[#5D5D5D mb-10 hidden px-5 text-center lg:block lg:whitespace-nowrap">
              Your address is only shared with guests after they’ve made a
              reservation.
            </P>

            <div className=" flex flex-col items-center justify-center gap-2 px-5">
              <Dropdown
                choice="Country/Region"
                options={CountryOptions}
                className="w-[360px] md:w-[572px]"
                name="Country"
              />
              <Input
                placeholder="Street Address"
                type="input"
                name="Street"
                className="w-[360px] md:w-[572px]"
              />
              <Dropdown
                choice="City"
                options={cities.map((item) => ({
                  label: item.Name,
                  value: item.Name
                }))}
                className="w-[360px] md:w-[572px]"
                name="City"
              />
              <Dropdown
                choice="State"
                options={states.map((item) => ({
                  label: item.Name,
                  value: item.Name
                }))}
                name="State"
                onChange={() => onSelectState(values.State)}
                className="w-[360px] md:w-[572px]"
              />
              <Input
                placeholder="Postal code"
                type="input"
                name="PostalCode"
                className="w-[360px] md:w-[572px]"
              />
            </div>

            <div className="mb-5 mt-10   flex justify-end gap-3 pr-5">
              <Button size="sm" color="muted" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                type="submit"
                className="capitalize"
              >
                Next
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

const Form3: React.FC<{
  setAddress: (address: ILocation) => void;
  address: ILocation;
  onCancel: () => void;
}> = ({ address, setAddress, onCancel }) => {
  return (
    <>
      <H5 className="my-5">Your location on map</H5>
      <div className="relative h-[384px] w-[360px] rounded-md md:w-[572px]">
        <Map location={address} className="h-[384px] w-[360px]  md:w-[572px]" />
      </div>
      <div className="mb-5 mt-10   flex justify-end gap-3 pr-5">
        <Button size="sm" color="muted" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          color="primary"
          className="capitalize"
          onClick={() => setAddress(address)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

const MapForm: React.FC<{
  setAddress: (address: ILocation) => void;
  address: ILocation;
  onCancel: () => void;
}> = ({ address, onCancel, setAddress }) => {
  const [form, setForm] = useState<"Form1" | "Form2" | "Form3">("Form1");
  const [updatedAddress, setUpdatedAddress] = useState(address);

  return (
    <div>
      {form === "Form1" && (
        <Form1
          setAddress={(addr: ILocation) => {
            setUpdatedAddress(addr);
            setForm("Form2");
          }}
          address={updatedAddress}
          onCancel={onCancel}
        />
      )}
      {form === "Form2" && (
        <Form2
          setAddress={(addr: ILocation) => {
            setUpdatedAddress(addr);
            setForm("Form3");
          }}
          address={updatedAddress}
          onCancel={onCancel}
        />
      )}
      {form === "Form3" && (
        <Form3
          setAddress={(addr: ILocation) => {
            setUpdatedAddress(addr);
            setAddress(addr);
          }}
          address={updatedAddress}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default MapForm;
