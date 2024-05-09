import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ManageApartment.module.scss";

interface ManageApartmentProps {
  content: string;
  link: string;
}

const ManageApartmentItem: React.FC<ManageApartmentProps> = ({ content, link }) => {
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

// Example usage of the ManageApartment component
const ManageApartment: React.FC<{aparmentid: string}> = ({aparmentid}) => {
  const router = useRouter();
  return (
    <div className="">
      <H4>Manage Apartment</H4>
      <div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Name and Description"
            link={`/apartment/${aparmentid}/manage/info`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Location"
            link={`/apartment/${aparmentid}/manage/location`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Location"
            link={`/apartment/${aparmentid}/manage/location`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Media"
            link={`/apartment/${aparmentid}/manage/media`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Prices"
            link={`/apartment/${aparmentid}/manage/pricing`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Facilities"
            link={`/apartment/${aparmentid}/manage/facilities`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="FAQs"
            link={`/apartment/${aparmentid}/manage/faq`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Payments"
            link={`/apartment/${aparmentid}/manage/payment`}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageApartment;
