import ForwardArrowIcon from "@/assets/icons/arrow-forward.svg";
import { H4 } from "@/components/Headings/Headings";
import Link from "next/link";
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
const ManageApartment: React.FC<{apartmentid: string}> = ({apartmentid}) => {
  return (
    <div className="">
      <H4>Manage Apartment</H4>
      <div>
        <div className={styles.apartmentContent}>
          <ManageApartmentItem
            content="Faq"
            link={`/apartment/${apartmentid}/manage/faq`}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageApartment;
