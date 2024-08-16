import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
import styles from "./ManageHotelAccount.module.scss";

interface ManageHotelAccountProps {
  content: string;
  link: string;
}

const ManageAccountItem: React.FC<ManageHotelAccountProps> = ({
  content,
  link
}) => {
  return (
    <Link className={styles.container} href={link}>
      <div className={styles.content}>
        <div>{content}</div>
      </div>
      <div className={styles.editIcon}>
        <ForwardArrowIcon />
      </div>
    </Link>
  );
};

// Example usage of the EditApartment component
const ManageAccountComponent: React.FC<{ hotelid: string }> = ({ hotelid }) => {
  return (
    <div className="w-full">

      <div className="mt-5 flex flex-col gap-4">
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Hotel Information"
            link={`/hotels/${hotelid}/manage/hotel-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Location"
            link={`/hotels/${hotelid}/manage/address`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Images"
            link={`/hotels/${hotelid}/manage/banner-images`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Management"
            link={`/hotels/${hotelid}/manage/management`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Manager"
            link={`/hotels/${hotelid}/manage/manager`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Contact Person"
            link={`/hotels/${hotelid}/manage/support`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Users"
            link={`/hotels/${hotelid}/manage/users`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Bank Information"
            link={`/hotels/${hotelid}/manage/bank-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Earnings"
            link={`/hotels/${hotelid}/manage/earnings`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem content="Frequently Asked Questions" link={`/hotels/${hotelid}/manage/faq`} />
        </div>
      </div>
    </div>
  );
};

export { ManageAccountItem, ManageAccountComponent };
