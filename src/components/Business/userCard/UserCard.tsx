import React from "react";
import AdminProfile from "@/assets/icons/admin-profile.svg";
import Kebab from "@/assets/icons/kebab.svg";
import Button from "@/components/Button/Button";
import { H4, P } from "@/components/Headings/Headings";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { getHotelUsers } from "@/services/hotel-users";
import Modal from "@/components/Modal/Modal";
import styles from "./User.module.scss";
import NewUserRoleModel from "../Modals/newAdminRole/NewUserRoleModal";
import NewAdminModal from "../Modals/newAdmin/NewAdminModal";

const UserCard = () => {
  const [firstModal, setFirstModal] = React.useState(false);
  const [custonRoleModal, setCustonRoleModal] = React.useState(false);
  const { data } = useQuery([queryKeys.getHotelUsers], getHotelUsers);

  const hotelUsers = data?.data.HotelUsers;

  return (
    <div className="bg-white pb-14 pt-5">
      <div className={styles.container}>
        <H4>Admins/Users</H4>
        <Button size="md" onClick={() => setFirstModal(true)}>
          Add a new User
        </Button>
      </div>

      <div className={styles.header}>
        {hotelUsers?.map((item, index) => (
          <div key={index} className={styles.cardContainer}>
            <div>
              <div className={styles.adminHeader}>
                <div className="ml-3">
                  <AdminProfile />
                </div>
                <div className="ml-8 mt-1">
                  <Kebab />
                </div>
              </div>
              <div className="mt-6">
                <P className={styles.itemName}>
                  {item.Firstname} {item.Lastname}
                </P>
                {item.Status === "Active" ? (
                  <span className={styles.active}>Active</span>
                ) : (
                  <span className={styles.inactive}>Inactive</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {(!hotelUsers || hotelUsers?.length < 1) && (
          <P>Got more hands: Add users to help you manage your account!</P>
        )}
      </div>
      {custonRoleModal && (
        <div className="fixed left-0 top-0 z-[1000000] flex h-screen w-screen items-center justify-center bg-transparent shadow-lg">
          <div className="h-[98vh] w-full max-w-[600px] bg-white px-10">
            <NewUserRoleModel closeModal={() => setCustonRoleModal(false)} />
          </div>
        </div>
      )}
      <Modal
        openModal={firstModal}
        setOpenModal={setFirstModal}
        variant="filled"
        className=" mx-2 w-full max-w-[500px]"
      >
        <NewAdminModal
          onClickCreateCustomRole={() => setCustonRoleModal(true)}
          closeModal={setFirstModal}
        />
      </Modal>
    </div>
  );
};

export default UserCard;
