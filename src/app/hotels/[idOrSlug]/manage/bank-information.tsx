import { H3, H6, P2, P3 } from "@/components/Headings/Headings";
import BankIcon from "@/assets/icons/bank.svg";
import AddIcon from "@/assets/icons/add.svg";
import Modal from "@/components/Modal/Modal";
import React, { useCallback } from "react";
import Button from "@/components/Button/Button";
import { useMutation, useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import {
  getPaymentDetails,
  setDefaultPaymentDetails
} from "@/services/payment-details";
import type { IPaymentDetails } from "@/services/payment-details/payload";
import HotelAdminLayout from "@/layout/hotelAdmin/HotelAdmin";
import styles from "./PaymentSettings.module.scss";
import AddPayOutPayout from "@/components/AddPayOutPayout/AddPayOutPayout";

const PaymentSettings = () => {
  const [showAddPaymentOptionModal, setShowAddPaymentOptionModal] =
    React.useState(false);

  const { data, refetch } = useQuery(
    [queryKeys.getUserPaymentDetails],
    getPaymentDetails
  );

  const { mutate, isLoading: settingDefault } = useMutation(
    setDefaultPaymentDetails
  );

  const paymentDetails = data?.data.PaymentDetails;

  const onSelectDefault = useCallback(
    (paymentDetailsId: string) => {
      // if (paymentDetails?.find((item) => item.PaymentId)?.IsDefault) return;
      mutate(paymentDetailsId, {
        onSuccess() {
          refetch();
        }
      });
    },
    [paymentDetails]
  );

  return (
    <HotelAdminLayout>
      <div className="min-h-[80vh] max-w-[620px] bg-white  p-5">
        <H3 className="mb-8">Payment Settings</H3>
        <H6>Pay-out Options</H6>
        <P2 className="my-4 mb-5 font-bold">
          Accounts to recieve payments for your bookings
        </P2>
        <div className="">
          {paymentDetails?.map((item: IPaymentDetails) => (
            <div
              className={styles.paymentItem}
              key={item.PaymentId}
              onClick={() => !item.IsDefault && onSelectDefault(item.PaymentId)}
            >
              <div className={"flex items-center justify-center gap-2"}>
                <BankIcon /> <H6>{item.BankName}</H6>
              </div>
              <div className="flex flex-col">
                <P2 className="text-black">{item.AccountNumber} </P2>
                <P3 className="text-white900">{item.AccountName}</P3>
              </div>
              {item.IsDefault && (
                <P3 className="rounded-full border border-primary400 px-5 py-1">
                  default
                </P3>
              )}
              {!item.IsDefault && (
                <span className={styles.tooltiptext}>
                  <P2>
                    {settingDefault ? "Updating Default..." : "Set as defailt"}
                  </P2>
                </span>
              )}
            </div>
          ))}
          <div>
            <Button
              color="outline-dark"
              variant="outline"
              size="md"
              onClick={() => setShowAddPaymentOptionModal(true)}
              className="inline-flex items-center gap-2"
            >
              <AddIcon />
              <P2>Add payment method</P2>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        openModal={showAddPaymentOptionModal}
        setOpenModal={setShowAddPaymentOptionModal}
        variant="plain"
      >
        <section>
          <AddPayOutPayout
            onClose={() => setShowAddPaymentOptionModal(false)}
            onAddPaymentMethod={() => {
              setShowAddPaymentOptionModal(false);
              refetch();
            }}
          />
        </section>
      </Modal>
    </HotelAdminLayout>
  );
};

export default PaymentSettings;
