import Avatar from "@/components/Avatar/Avatar";
import styles from "../ChatMain.module.scss";
import { P, P2 } from "@/components/Headings/Headings";

const SkeletonRecievedChat = () => {
  return (
    <div className={styles.container}>
      <div>
        <Avatar
          Imageurl={""}
          Firstname={""}
          Lastname={""}
          className={`${styles.img} animate-pulse`}
        />
      </div>
      <div>
        <div className={styles.header}>
          <P className="mb-2 py-3"></P>
        </div>
        <div>
          <P2 className="text-[#344054 mt-1 w-[300px] animate-pulse rounded-r-xl bg-grey100  py-2 pl-3"></P2>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRecievedChat;
