import { P, P2 } from "@/components/Headings/Headings";
import TickedMessage from "@/assets/icons/tick.svg";
import styles from "../ChatMain.module.scss";

const SkeletonSentChat: React.FC = () => {
  return (
    <div className="mb-5 ">
      <div className={styles.container2}>
        <div className={styles.headerSkeleton2}>
          <P className="m-2 py-5"></P>
        </div>
        <div className="flex h-8 w-10 items-center justify-center">
          <TickedMessage />
        </div>
      </div>
      <div className={styles.bottom}>
        <P2 className=" mt-2 w-[300px] animate-pulse  rounded-l-xl bg-grey100 px-5 py-2"></P2>
      </div>
    </div>
  );
};

export default SkeletonSentChat;
