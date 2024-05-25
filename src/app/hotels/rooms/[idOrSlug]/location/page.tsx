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
import { getRoom } from "@/services/room";
import { IRoom } from "@/services/room/payload";

const EditApartmentDetails = () => {

  const { idOrSlug } = useParams<{ idOrSlug: string }>();


  const { data } = useQuery(
    [queryKeys.getRoomByID],
    () => {
      const res = getRoom(idOrSlug?.toString() ?? "");
      return res;
    },
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const room = (data?.data as IRoom) || [];

  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState(false);
  const [roomDetails, setRoomDetails] = React.useState<IAddress>({
    ...room.Hotel.Address
  });

  const [address, setAddress] = React.useState<ILocation>({
    Street: roomDetails.Street || "",
    City: roomDetails.City || "",
    State: roomDetails.State || "",
    Country: roomDetails.Country || "",
    PostalCode: roomDetails.PostalCode || "",
    Latitude: roomDetails.Latitude || "",
    Longitude: roomDetails.Longitude || ""
  });

  const apartmentId = idOrSlug ? idOrSlug.toString() : "";
  const { mutate, isLoading } = useMutation((payload: IAddress) =>
    updateApartmentAddress(apartmentId, payload)
  );

  const [description, setDescription] = React.useState(
    roomDetails?.Location?.Description || ""
  );

  const onAddNearby = (nearby: INearby) => {
    const nearbys = roomDetails.Location.Nearby;
    nearbys.push(nearby);

    setRoomDetails((previousState) => ({
      ...previousState,
      Location: {
        ...previousState.Location,
        Nearby: nearbys
      }
    }));
  };
  const onUpdateNearby = (oldNearby: INearby, nearby: INearby) => {
    const cApartmentDetails = roomDetails;
    const nearbys = roomDetails.Location.Nearby;
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
    setRoomDetails({ ...cApartmentDetails });
  };

  const onUpdateDescription = () => {
    const cRoomDetails = roomDetails;
    cRoomDetails.Location = {
      ...cRoomDetails.Location,
      Description: description
    };
    setRoomDetails({ ...cRoomDetails });
  };

  const onSubmit = () => {
    if (!roomDetails) return;
    mutate(roomDetails, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  const onUpdateAddress = (addr: ILocation) => {
    setAddress({ ...addr });
    const cRoomDetails = { ...addr, Location: roomDetails.Location };
    setRoomDetails({ ...cRoomDetails });
    setShowAddressModal(false);
  };

  useEffect(() => {
    onSubmit();

    return () => {};
  }, [roomDetails]);

  return (
    <DefaultLayout>
      <div className="w-full lg:w-[556px]">
        <H3 className="mb-5">Room Location</H3>
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
                {roomDetails?.Location?.Description ||
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
          placesNearby={roomDetails?.Location?.Nearby || []}
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
