import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ManageApartment.module.scss";
import { useParams } from "next/navigation";

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
const ManageApartment: React.FC<{ apartmentid: string}> = ({apartmentid}) => {
  const router = useRouter();
  return (
    <div className="">
      <H4>Manage Apartment</H4>
      <div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Apartment Infrormation"
            link={`/apartment/${apartmentid}/manage/apartment-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Specification"
            link={`/apartment/${apartmentid}/manage/details`}
          />
        </div>    
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Location"
            link={`/apartment/${apartmentid}/manage/location`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Media"
            link={`/apartment/${apartmentid}/manage/media`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Prices"
            link={`/apartment/${apartmentid}/manage/pricing`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Facilities"
            link={`/apartment/${apartmentid}/manage/facilities`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="FAQs"
            link={`/apartment/${apartmentid}/manage/faq`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Payments"
            link={`/apartment/${apartmentid}/manage/payment`}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageApartment;
