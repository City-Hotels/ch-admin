import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ManageApartment.module.scss";
import { useParams } from "next/navigation";

interface ManageRoomProps {
  content: string;
  link: string;
}

const ManageApartmentItem: React.FC<ManageRoomProps> = ({ content, link }) => {
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
const ManageRoom: React.FC<{ roomid: string}> = ({roomid}) => {
  const router = useRouter();
  return (
    <div className="">
      <H4>Manage Room</H4>
      <div>
  
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Apartment Infrormation"
            link={`/apartment/${roomid}/manage/apartment-information`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Specification"
            link={`/apartment/${roomid}/manage/details`}
          />
        </div>    
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Location"
            link={`/apartment/${roomid}/manage/location`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Media"
            link={`/apartment/${roomid}/manage/media`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Prices"
            link={`/apartment/${roomid}/manage/pricing`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Facilities"
            link={`/apartment/${roomid}/manage/facilities`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="FAQs"
            link={`/apartment/${roomid}/manage/faq`}
          />
        </div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Payments"
            link={`/apartment/${roomid}/manage/payment`}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageRoom;
