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
const ManageAccountComponent: React.FC = () => {
  return (
    <div className="w-full">
      <H4>Manage</H4>
      <div className="mt-5 flex flex-col gap-4">
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Basic Information"
            link={`/hotel/manage/hotel-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Location"
            link={`/hotel/manage/address`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Images"
            link={`/hotel/manage/banner-images`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Management"
            link={`/hotel/manage/management-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Support/Contact Person"
            link={`/hotel/manage/support`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Bank Information"
            link={`/hotel/manage/bank-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem
            content="Earnings"
            link={`/hotel/manage/earnings`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageAccountItem content="FAQs" link={`/hotel/manage/faq`} />
        </div>
      </div>
    </div>
  );
};

export { ManageAccountItem, ManageAccountComponent };
