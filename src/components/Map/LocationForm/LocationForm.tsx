import LocationIcon from "@/assets/icons/location-marker.svg";
import { P } from "@/components/Headings/Headings";
import Map from "@/components/Map/Map";
import type { ILocation } from "@/services/location/payload";
import React from "react";
import type { Suggestion } from "react-places-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import styles from "./LocationForm.module.scss";
import type LocationFormProps from "./LocationForm.props";

const LocationItem: React.FC<{
  location: Suggestion;
}> = ({ location }) => (
  <div className={`${styles.LocationItem}`}>
    <LocationIcon />
    <div>
      <P className="text-white900">{location.description}</P>
    </div>
  </div>
);

const LocationForm: React.FC<LocationFormProps> = ({ onSelectLocation, value }) => {
  const defaultLocation = value
    ? `${value?.City && `${value?.City},`} ${value?.Country || "Nigeria"}`
    : "";
  const [address, setAddress] = React.useState(defaultLocation);
  const [location, setLocation] = React.useState<ILocation>({
    Latitude: "9.082",
    Longitude: "8.6753",
    Street: "",
    City: "",
    State: "",
    Country: "Nigeria",
    PostalCode: ""
  });

  const getAddressComponent = (
    result: google.maps.GeocoderResult,
    type: string
  ) => {
    console.log({ result });
    const addressComponent = result.address_components.find(
      (component) => component.types.indexOf(type) !== -1
    );

    return addressComponent ? addressComponent.long_name : "";
  };

  const handleSelect = async (addr: string) => {
    try {
      const results = await geocodeByAddress(addr);
      if (!results[0]) return;

      setAddress(addr);
      const latLng = await getLatLng(results[0]);
      const add = {
        Latitude: latLng?.lat.toString() || "",
        Longitude: latLng?.lng.toString() || "",
        Street: `${getAddressComponent(
          results[0],
          "street_number"
        )} ${getAddressComponent(results[0], "route")} ${getAddressComponent(
          results[0],
          "administrative_area_level_3"
        )}`,
        City: getAddressComponent(results[0], "neighborhood"),
        State: getAddressComponent(results[0], "administrative_area_level_1"),
        Country: getAddressComponent(results[0], "country"),
        PostalCode: getAddressComponent(results[0], "postal_code")
      };
      setLocation(add);
      onSelectLocation(add);
    } catch (error) {
      // console.error("Error selecting location:", error);
    }
  };

  return (
    <div className={`${styles.MapContainer}`}>
      <Map
        location={location}
        showAddress={false}
        className="h-[384px] w-[360px]  md:w-[572px]"
      />
      <div className={`${styles.MapInputContainer}`}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <div className={`${styles.MapInput}`}>
                <LocationIcon />
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                  className={`${styles.MapSelect}`}
                  name="Enter your address"
                />
              </div>

              <div className={`${styles.LocationContainer}`}>
                {loading && <div className="p-3"> Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                      key={suggestion.placeId}
                    >
                      <LocationItem location={suggestion} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>{" "}
    </div>
  );
};

export default LocationForm;
