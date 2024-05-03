import React, { useState } from "react";
import LocationIcon from "@/assets/icons/location-marker.svg";
import CulinaryIcon from "@/assets/icons/restaurant sign.svg";
import BusIcon from "@/assets/icons/bus.svg";
import Input from "@/components/formik/input/Input";
import Dropdown from "@/components/formik/input/dropdown/Dropdowns";
import Button from "@/components/Button/Button";
import type { INearby } from "@/services/hotel/payload";
import { Formik } from "formik";
import { nearbyLocationFormSchema } from "@/utils/formSchema";
import { P, P2 } from "../Headings/Headings";

const PlacesNearbyInput: React.FC<{
  type: "add" | "update";
  FormType: INearby["Type"];
  onSubmit: (nearby: INearby) => void;
  onCancel: Function;
  initialValues: INearby;
}> = ({ onSubmit, initialValues, FormType, type, onCancel }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit({ ...values, Type: FormType });
          onCancel();
        }}
        validationSchema={nearbyLocationFormSchema}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="">
            <div className="flex w-full gap-2">
              <div className="basis-7/12">
                <Input
                  name="Location"
                  label=""
                  placeholder="E.g Airports, Train stations, schools, etc"
                  type="text"
                  className="bg-white100 text-white700"
                />
              </div>
              <div className="basis-3/12">
                <Input
                  name="Distance"
                  label=""
                  placeholder="e.g 5mins"
                  type="text"
                  className="bg-white100 text-white700"
                />
              </div>
              <div className="basis-3/12">
                <Dropdown
                  placeholder="Distance in time"
                  className="  bg-white100 px-0 text-white700"
                  name="Unit"
                  options={[
                    { label: "Walking", value: "walking" },
                    { label: "Cycling", value: "cycling" },
                    { label: "Driving", value: "driving" },
                    { label: "Meters", value: "meters" },
                    { label: "Kilometers", value: "kilometers" },
                    { label: "Miles", value: "miles" },
                    { label: "foot", value: "ft" }
                  ]}
                />
              </div>
            </div>
            <div className="mb-5 flex justify-end gap-3">
              <Button
                size="sm"
                color="muted"
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                type="submit"
                className="capitalize"
              >
                {type}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
const PlacesNearbyFilled: React.FC<{
  location: string;
  distance: string;
  unit: string;
  onUpdate: Function;
}> = ({ location, distance, unit, onUpdate }) => {
  return (
    <div className=" my-4 rounded-md border border-[#ddd] bg-white100 px-5 py-2">
      <div className="flex w-full items-center justify-between gap-2 ">
        <div className=" flex basis-3/4 gap-1">
          <P className="text-black">{location}</P>
          <P className="text-black">
            - {distance} {unit}
          </P>
        </div>
        <Button
          size="sm"
          color="text"
          className="text-orange400"
          onClick={() => onUpdate()}
        >
          edit
        </Button>
      </div>
    </div>
  );
};

const PlacesNearbyItem: React.FC<
  INearby & { onUpdate: (nearby: INearby) => void }
> = ({ Location, Distance, Type, Unit, onUpdate }) => {
  const [editLocation, setEditLocation] = useState(false);
  const [nearby, setNearby] = useState({ Location, Distance, Type, Unit });

  return (
    <div>
      {editLocation ? (
        <PlacesNearbyInput
          type="update"
          FormType={Type}
          onSubmit={(item) => {
            setNearby(item);
            onUpdate(item);
          }}
          onCancel={() => setEditLocation(false)}
          initialValues={{ Location, Distance, Type, Unit }}
        />
      ) : (
        <PlacesNearbyFilled
          onUpdate={() => setEditLocation(true)}
          key={nearby.Location}
          distance={nearby.Distance}
          location={nearby.Location}
          unit={nearby.Unit}
        />
      )}
    </div>
  );
};

const PlacesNearbyFormWrapper: React.FC<{
  placesNearby: INearby[];
  FormType: INearby["Type"];
  Icon: any;
  onSubmit: (nearby: INearby) => void;
  onUpdate: (oldNearby: INearby, nearby: INearby) => void;
}> = ({ placesNearby, FormType, Icon, onSubmit, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="mb-5 mt-10">
        <Button
          color="text"
          onClick={() => setShowForm(true)}
          className="hover:text-orange-400"
        >
          <span className="flex items-center gap-2">
            <Icon /> <P2> + Add popular {FormType}</P2>
          </span>
        </Button>
        {showForm && (
          <PlacesNearbyInput
            type="add"
            FormType={FormType}
            onSubmit={onSubmit}
            onCancel={() => setShowForm(false)}
            initialValues={{
              Location: "",
              Distance: "",
              Type: FormType,
              Unit: ""
            }}
          />
        )}
      </div>

      {[...placesNearby].map((item, index) => (
        <PlacesNearbyItem
          key={item.Location + index}
          {...item}
          onUpdate={(nearby) => onUpdate(item, nearby)}
        />
      ))}
    </div>
  );
};
const PlacesNearbyForm: React.FC<{
  placesNearby: INearby[];
  onSubmit: (nearby: INearby) => void;
  onUpdate: (oldNearby: INearby, nearby: INearby) => void;
}> = ({ placesNearby, onSubmit, onUpdate }) => {
  return (
    <div>
      <PlacesNearbyFormWrapper
        FormType={"Eatery"}
        Icon={CulinaryIcon}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
        placesNearby={placesNearby.filter((item) => item.Type === "Eatery")}
      />
      <PlacesNearbyFormWrapper
        FormType={"Places"}
        Icon={LocationIcon}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
        placesNearby={placesNearby.filter((item) => item.Type === "Places")}
      />
      <PlacesNearbyFormWrapper
        FormType={"Commute"}
        Icon={BusIcon}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
        placesNearby={placesNearby.filter((item) => item.Type === "Commute")}
      />
    </div>
  );
};

export default PlacesNearbyForm;
