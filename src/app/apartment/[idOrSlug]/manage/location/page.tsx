"use client"
import React, { useEffect } from "react";
import type { IAddress, IApartment } from "@/services/apartment/payload";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getApartment, updateApartmentAddress } from "@/services/apartment";
import queryKeys from "@/utils/api/queryKeys";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import PlacesNearbyForm from "@/components/PlacesNearbyForm/PlacesNearbyForm";
import type { INearby } from "@/services/hotel/payload";
import Modal from "@/components/Modal/Modal";
import Map from "@/components/Map/Map";
import TextArea from "@/components/Inputs/textarea/TextArea";
import MapForm from "@/components/Map/MapForm";
import type { ILocation } from "@/services/location/payload";
import Button from "@/components/Button/Button";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { H3, P2 } from "@/components/Headings/Headings";
import { useParams } from "next/navigation";

const EditApartmentDetails = () => {

  const { idOrSlug } = useParams<{ idOrSlug: string }>();


  const { data } = useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(idOrSlug?.toString() ?? "");
      return res;
    },
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const apartment = (data?.data as IApartment) || [];

  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [apartmentDetails, setApartmentDetails] = React.useState<IAddress>({
    ...apartment.Address
  });

  const [address, setAddress] = React.useState<ILocation>({
    Street: apartmentDetails.Street || "",
    City: apartmentDetails.City || "",
    State: apartmentDetails.State || "",
    Country: apartmentDetails.Country || "",
    PostalCode: apartmentDetails.PostalCode || "",
    Latitude: apartmentDetails.Latitude || "",
    Longitude: apartmentDetails.Longitude || ""
  });

  const apartmentId = idOrSlug ? idOrSlug.toString() : "";
  const { mutate, isLoading } = useMutation((payload: IAddress) =>
    updateApartmentAddress(apartmentId, payload)
  );

  const [description, setDescription] = React.useState(
    apartmentDetails?.Location?.Description || ""
  );

  const onAddNearby = (nearby: INearby) => {
    const nearbys = apartmentDetails.Location.Nearby;
    nearbys.push(nearby);

    setApartmentDetails((previousState) => ({
      ...previousState,
      Location: {
        ...previousState.Location,
        Nearby: nearbys
      }
    }));
  };
  const onUpdateNearby = (oldNearby: INearby, nearby: INearby) => {
    const cApartmentDetails = apartmentDetails;
    const nearbys = apartmentDetails.Location.Nearby;
    cApartmentDetails.Location = {
      ...cApartmentDetails.Location,
      Nearby: nearbys.map((item) => {
        if (item.Location === oldNearby.Location) {
          item.Location = nearby.Location;
          item.Distance = nearby.Distance;
        }
        return item;
      })
    };
    setApartmentDetails({ ...cApartmentDetails });
  };

  const onUpdateDescription = () => {
    const cApartmentDetails = apartmentDetails;
    cApartmentDetails.Location = {
      ...cApartmentDetails.Location,
      Description: description
    };
    setApartmentDetails({ ...cApartmentDetails });
  };

  const onSubmit = () => {
    if (!apartmentDetails) return;
    mutate(apartmentDetails, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  const onUpdateAddress = (addr: ILocation) => {
    setAddress({ ...addr });
    const cApartmentDetails = { ...addr, Location: apartmentDetails.Location };
    setApartmentDetails({ ...cApartmentDetails });
    setShowAddressModal(false);
  };

  useEffect(() => {
    onSubmit();

    return () => {};
  }, [apartmentDetails]);

  return (
    <DefaultLayout>
      <div className="w-full lg:w-[556px]">
        <H3 className="mb-5">Apartment Location</H3>
        <div onClick={() => setShowAddressModal(true)} className=" ">
          <Map
            location={address}
            showAddress
            className="h-[200px] lg:w-[500px]"
          />
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
                {apartmentDetails?.Location?.Description ||
                  "Write something about the area"}
              </P2>
            </div>
          )}
          <div className="absolute bottom-2  flex w-full justify-end gap-2">
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
          placesNearby={apartmentDetails?.Location?.Nearby || []}
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

export default EditApartmentDetails;
