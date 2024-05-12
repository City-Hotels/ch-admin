import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
<<<<<<< HEAD
=======
import { useRouter } from "next/navigation";
>>>>>>> CHW-459-manage-apartment
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
<<<<<<< HEAD
const ManageApartment: React.FC<{apartmentid: string}> = ({apartmentid}) => {
=======
const ManageApartment: React.FC<{ apartmentid: string}> = ({apartmentid}) => {
  const router = useRouter();
>>>>>>> CHW-459-manage-apartment
  return (
    <div className="">
      <H4>Manage Apartment</H4>
      <div>
<<<<<<< HEAD
    
=======
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
>>>>>>> CHW-459-manage-apartment
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Media"
            link={`/apartment/${apartmentid}/manage/media`}
<<<<<<< HEAD
=======
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
>>>>>>> CHW-459-manage-apartment
          />
        </div>
      </div>
    </div>
  );
};

export default ManageApartment;
