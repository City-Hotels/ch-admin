import type { FC } from "react";
import { GoLocation } from "react-icons/go";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import type MapProps from "./Map.props";
import { P2, P3 } from "../Headings/Headings";
import styles from "./Map.module.scss";

const Map: FC<MapProps> = ({ location, showAddress, className }) => {
  const center = useMemo(() => {
    if (!location) return { lat: 9.082, lng: 8.6753 };
    const { Latitude, Longitude } = location;
    return {
      lat: parseFloat(Latitude) || 9.082,
      lng: parseFloat(Longitude) || 8.6753
    };
  }, [location]);
  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_API_KEY ||
      "AIzaSyDeXKga524Y7M3c7UsBH4B5EXvdzfBWmFs"
  });
  return (
    <div className={styles.header}>
      <div className="relative block ">
        {!isLoaded ? (
          <P2 className="text-white800">Loading...</P2>
        ) : (
          <GoogleMap
            mapContainerClassName={`map-container ${className}`}
            center={center}
            zoom={20}
          />
        )}
      </div>
      {showAddress && (
        <div className={styles.addressHeader}>
          <div className={styles.iconHeader}>
            <GoLocation className={styles.icon} />
          </div>
          <P3 weight="bold">
            {location &&
              Object.values(location)
                .filter((item) => item)
                .join(", ")}
          </P3>
        </div>
      )}
    </div>
  );
};

export default Map;
