import React, { useState } from "react";
import SubscriptionSearchProps from "./SubscriptionSearch.props";
import { useMutation, useQuery } from "react-query";
import { searchApartment } from "@/services/apartment";
import { IApartment } from "@/services/apartment/payload";
import queryKeys from "@/utils/api/queryKeys";
import { postPromotion } from "@/services/promotions";
import styles from "./SubscriptionSearch.module.scss";
import { P } from "../Headings/Headings";

const SubscriptionSearch: React.FC<SubscriptionSearchProps> = ({
  className,
  value,
  promotionId,
  onApartmentSelected,
  setOpenSubscription
}) => {
  const [apartmentSearch, setApartmentSearch] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { isLoading, data, isError } = useQuery(
    [queryKeys.getApartmentSearch, apartmentSearch],
    () => searchApartment({ ApartmentName: apartmentSearch }),
    {
      enabled: !!apartmentSearch // Only fetch when there's input
    }
  );

  const apartments = (data?.data.Apartments as IApartment[]) || [];
  const { mutate } = useMutation(postPromotion, {
    onSuccess: () => {
      onApartmentSelected();
    }
  });

  const handleApartmentSelect = (apartment: IApartment) => {
    setApartmentSearch(apartment.Name);
    setShowSuggestions(false);

    mutate({
      PaymentReference: "",
      PromotionId: promotionId || "",
      ServiceId: apartment.Id
    });
    setOpenSubscription(false);
  };

  return (
    <div
      className={`bg-white rounded-lg border border-solid border-neutral-300 py-2 px-4 ${className}`}
    >
      <input
        className="w-full outline-none"
        placeholder="Search Apartment"
        value={apartmentSearch}
        onChange={(e) => {
          setApartmentSearch(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />

      {isLoading && (
        <ul className="flex flex-col items-center gap-2 mt-4">
          <li className={styles.subcriptionsDropdownLoaderItem} />
          <li className={styles.subcriptionsDropdownLoaderItem} />
          <li className={styles.subcriptionsDropdownLoaderItem} />
          <li className={styles.subcriptionsDropdownLoaderItem} />
        </ul>
      )}

      {isError && <P>Failed to Load Apartments</P>}

      {showSuggestions && !isLoading && !isError && (
        <ul className="mt-4 w-full max-h-48 overflow-y-auto">
          {apartments.map((apartment, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 w-full hover:bg-orange-400 cursor-pointer"
              onClick={() => handleApartmentSelect(apartment)}
            >
              {apartment.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionSearch;
