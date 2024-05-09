import { useEffect, useState } from "react";
import { H6, P, P2 } from "@/components/Headings/Headings";
import type { IDetailsPayload } from "@/services/apartment/payload";
import styles from "./ApartmentDetailsForm.module.scss";
import type { ApartmentDetailsFormProps } from "./ApartmentDetailsForm.props";

const CounterItem: React.FC<{
  title: string;
  description: string;
  count: number;
  onIncreaseCount: Function;
  onDecreaseCount: Function;
}> = ({ title, description, onDecreaseCount, onIncreaseCount, count }) => (
  <div className=" mt-3">
    <H6>{title}</H6>
    <P2 className="mt-2 text-white900">{description}</P2>
    <div className={styles.counterButton}>
      <button className={styles.removeButton} onClick={() => onDecreaseCount()}>
        -
      </button>
      <div className={styles.counterHeader}>
        <P className={styles.counterCount}>{count}</P>
      </div>
      <button className={styles.addButton} onClick={() => onIncreaseCount()}>
        +
      </button>
    </div>
  </div>
);

const ApartmentDetailsForm: React.FC<ApartmentDetailsFormProps> = ({
  onUpdateDetails,
  value
}) => {
  const [counter, setCounter] = useState<IDetailsPayload>(value);

  useEffect(() => {
    onUpdateDetails(counter);

    return () => { };
  }, [counter]);

  useEffect(() => {
    setCounter(value);

    return () => { };
  }, [value]);

  const { MaxBedRoom, MaxGuest, BedCount, BathCount } = counter;

  return (
    <div className={styles.container}>
      <CounterItem
        title="Number of Bedrooms"
        description="The number of bedrooms in the property"
        count={MaxBedRoom}
        onDecreaseCount={() =>
          setCounter({ ...counter, MaxBedRoom: MaxBedRoom - 1 })
        }
        onIncreaseCount={() =>
          setCounter({ ...counter, MaxBedRoom: MaxBedRoom + 1 })
        }
      />
      <CounterItem
        title="Number of Guests"
        description="The maximum number of people who can sleep comfortably given the total bed space and sofas."
        count={MaxGuest}
        onDecreaseCount={() =>
          setCounter({ ...counter, MaxGuest: MaxGuest - 1 })
        }
        onIncreaseCount={() =>
          setCounter({ ...counter, MaxGuest: MaxGuest + 1 })
        }
      />
      <CounterItem
        title="Number of Beds"
        description="The total number of people who can sleep comfortably given the total bed space and sofas."
        count={BedCount}
        onDecreaseCount={() =>
          setCounter({ ...counter, BedCount: BedCount - 1 })
        }
        onIncreaseCount={() =>
          setCounter({ ...counter, BedCount: BedCount + 1 })
        }
      />
      <CounterItem
        title="Number of Bathrooms"
        description="The maximum number of people who can sleep comfortably given the total bed space and sofas."
        count={BathCount}
        onDecreaseCount={() =>
          setCounter({ ...counter, BathCount: BathCount - 1 })
        }
        onIncreaseCount={() =>
          setCounter({ ...counter, BathCount: BathCount + 1 })
        }
      />
    </div>
  );
};

export default ApartmentDetailsForm;
