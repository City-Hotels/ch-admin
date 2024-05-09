import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
import { useRouter } from "next/router";
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
const ManageApartment: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className="">
      <H4>Manage Apartment</H4>
      <div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Name and Description"
            link={`/apartment/${slug}/manage/info`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Specification"
            link={`/apartment/${slug}/manage/details`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Location"
            link={`/apartment/${slug}/manage/location`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Media"
            link={`/apartment/${slug}/manage/media`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Prices"
            link={`/apartment/${slug}/manage/pricing`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Facilities"
            link={`/apartment/${slug}/manage/facilities`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="FAQs"
            link={`/apartment/${slug}/manage/faq`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Payments"
            link={`/apartment/${slug}/manage/payment`}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageApartment;
