"use client"
import React, { useEffect } from "react";

import type { IAddress } from "@/services/apartment/payload";
import { H3, P2 } from "@/components/Headings/Headings";
import Button from "@/components/Button/Button";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import PlacesNearbyForm from "@/components/PlacesNearbyForm/PlacesNearbyForm";
import type { IHotel, INearby } from "@/services/hotel/payload";
import TextArea from "@/components/Inputs/textarea/TextArea";

import { useDispatch, useSelector } from "react-redux";
import { getHotel, updateHotelAddress } from "@/services/hotel";
import type { AppDispatch } from "@/store";
import Modal from "@/components/Modal/Modal";
import type { ILocation } from "@/services/location/payload";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import MapForm from "@/components/Map/MapForm";
import Map from "@/components/Map/Map";

const EditHotelDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showAddressModal, setShowAddressModal] = React.useState(false);

  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const { isLoading: isFetching, isError, data } = useQuery(
    [queryKeys.getHotelByID, idOrSlug],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );
  const hotel = data?.data as IHotel;

  const [address, setAddress] = React.useState<ILocation>({
    Street: hotel?.Address?.Street || "",
    City: hotel?.Address?.City || "",
    State: hotel?.Address?.State || "",
    Country: hotel?.Address?.Country || "",
    PostalCode: hotel?.Address?.PostalCode || "",
    Latitude: hotel?.Address?.Latitude || "",
    Longitude: hotel?.Address?.Longitude || ""
  });

  const [apartmentDetails, setApartmentDetails] = React.useState<IAddress>({
    City: hotel?.Address?.City || "",
    Country: hotel?.Address?.Country || "",
    Location: {
      Description: hotel?.Address?.Location.Description || "",
      Nearby: hotel?.Address?.Location.Nearby || []
    },
    Latitude: hotel?.Address?.Latitude || "",
    Longitude: hotel?.Address?.Longitude || "",
    PostalCode: hotel?.Address?.PostalCode || "",
    State: hotel?.Address?.State || "",
    Street: hotel?.Address?.Street || ""
  });

  const [editDescription, setEditDescription] = React.useState(false);
  const [description, setDescription] = React.useState(
    hotel?.Address?.Location.Description || ""
  );
  const { mutate, isLoading } = useMutation(updateHotelAddress);

  const onSubmit = () => {
    if (!apartmentDetails) return;
    mutate(apartmentDetails, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
        setEditDescription(false);
      }
    });
  };

  const onUpdateAddress = (addr: ILocation) => {
    setAddress({ ...addr });
    const cApartmentDetails = { ...addr, Location: apartmentDetails.Location };
    setApartmentDetails({ ...cApartmentDetails });
    setShowAddressModal(false);
  };

  const onUpdateDescription = () => {
    const cApartmentDetails = apartmentDetails;
    cApartmentDetails.Location = {
      ...cApartmentDetails.Location,
      Description: description
    };
    setApartmentDetails({ ...cApartmentDetails });
  };

  const onAddNearby = (nearby: INearby) => {
    const cApartmentDetails = apartmentDetails;
    const nearbys = [...apartmentDetails.Location.Nearby];
    nearbys.push(nearby);
    cApartmentDetails.Location = {
      ...cApartmentDetails.Location,
      Nearby: nearbys
    };

    setApartmentDetails({ ...cApartmentDetails });
  };

  const onUpdateNearby = (oldNearby: INearby, nearby: INearby) => {
    const cApartmentDetails = apartmentDetails;
    const nearbys = apartmentDetails.Location.Nearby;
    cApartmentDetails.Location = {
      ...cApartmentDetails.Location,
      Nearby: nearbys.map((item) => {
        if (item.Location === oldNearby.Location) {
          return { ...nearby };
        }
        return item;
      })
    };
    setApartmentDetails({ ...cApartmentDetails });
  };

  useEffect(() => {
    onSubmit();

    return () => { };
  }, [apartmentDetails]);

  return (
    <DefaultLayout>
      <div className="w-full rounded-md bg-white p-5 lg:w-[586px]">
        <H3 className="mb-5">Hotel Location</H3>
        <div onClick={() => setShowAddressModal(true)} className=" ">
          <Map location={address} className="h-[200px] lg:w-[500px]" />
        </div>
        <div className="relative mt-5 min-h-[135px]">
          {editDescription ? (
            <TextArea
              name="Description"
              value={description || ""}
              placeholder="write something about the area"
              maxLength={1000}
              onChange={(e) => setDescription(e.currentTarget.value)}
              readOnly={!editDescription}
            ></TextArea>
          ) : (
            <div className="min-h-[100px] border p-3">
              <P2>
                {apartmentDetails.Location.Description ||
                  "Write something about the area"}
              </P2>
            </div>
          )}
          <div className="absolute bottom-3  mt-3 flex w-full justify-end gap-5">
            {editDescription ? (
              <>
                <Button
                  size="sm"
                  color="muted"
                  type="button"
                  onClick={() => setEditDescription(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  type="button"
                  isLoading={isLoading}
                  className="capitalize"
                  onClick={() => onUpdateDescription()}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                color="text"
                onClick={() => setEditDescription(true)}
                variant="text"
              >
                edit
              </Button>
            )}
          </div>
        </div>
        <H3 className="my-5">Places Nearby</H3>
        <PlacesNearbyForm
          onUpdate={onUpdateNearby}
          placesNearby={apartmentDetails?.Location.Nearby || []}
          onSubmit={onAddNearby}
        />
      </div>
      <Modal
        openModal={showAddressModal}
        setOpenModal={setShowAddressModal}
        variant="filled"
      >
        <div className="">
          <MapForm
            address={address}
            setAddress={onUpdateAddress}
            onCancel={() => setShowAddressModal(false)}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default EditHotelDetails;
