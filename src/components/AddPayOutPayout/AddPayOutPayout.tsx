import Button from "@/components/Button/Button";
import { H4, Label, P, P2 } from "@/components/Headings/Headings";
import Input from "@/components/formik/input/Input";
import { createPaymentDetailsSchema } from "@/utils/formSchema";
import { Formik } from "formik";
import { useMutation, useQuery } from "react-query";
import type {
  IBank,
  ICreatePaymentDetailsPayload
} from "@/services/payment-details/payload";
import {
  createPaymentDetails,
  getBanks,
  verifyAccountNumber
} from "@/services/payment-details";
import queryKeys from "@/utils/api/queryKeys";
import Dropdown from "@/components/formik/input/dropdown/Dropdowns";
import { useState } from "react";
import styles from "./AddPayOutPayout.module.scss";

const AddPayOutPayout: React.FC<{
  onClose: Function;
  onAddPaymentMethod: Function;
}> = ({ onAddPaymentMethod }) => {
  const { mutate, isLoading } = useMutation(createPaymentDetails);
  const [validAccountName, setValidatedAccountName] = useState(false);

  const { data, isLoading: fetchingBanks } = useQuery(
    [queryKeys.getBanks],
    getBanks
  );

  const { mutate: verifyPaymentRequest, data: verificationData } = useMutation(
    [queryKeys.verifyPaymentDetails],
    verifyAccountNumber
  );

  const AccountName = verificationData?.data.AccountName;
  const banks = data?.data.Banks as IBank[];

  const validateAccount = async (bankCode: string, accountNumber: string) => {
    if (accountNumber.length < 10) {
      setValidatedAccountName(false);
      return;
    }
    setValidatedAccountName(true);
    verifyPaymentRequest({ bankCode, accountNumber });
  };

  const onSubmitChangePassword = (values: ICreatePaymentDetailsPayload) => {
    values.bankName =
      banks.find((item) => item.Code === values.bankCode)?.Name || "";
    mutate(values, {
      onSuccess() {
        onAddPaymentMethod();
      }
    });
  };

  const initialValues: ICreatePaymentDetailsPayload = {
    accountNumber: "",
    bankName: "",
    bankCode: "",
    country: "Nigeria",
    currency: "NGN",
    routingNumber: "",
    swiftCode: ""
  };

  return (
    <div className={styles.header}>
      <H4 className="mb-10 px-6 text-center">Bank Details</H4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitChangePassword}
        validationSchema={createPaymentDetailsSchema}
        enableReinitialize
      >
        {({ handleSubmit, values, handleChange }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="px-6">
                <div className={styles.formInput}>
                  <div className="w-full">
                    <Label weight="bold">Bank</Label>
                    {fetchingBanks && <P2 className="mb-5">Fetching Banks</P2>}
                    {banks && (
                      <Dropdown
                        options={banks.map((item) => ({
                          label: item.Name,
                          value: item.Code
                        }))}
                        name="bankCode"
                        onChange={() =>
                          validateAccount(
                            values.bankCode || "",
                            values.accountNumber
                          )
                        }
                      />
                    )}
                  </div>
                </div>
                <div className={styles.formInput}>
                  <div className=" w-full">
                    <Input
                      type="text"
                      label="Account Number"
                      name="accountNumber"
                      onBlur={(e) => {
                        handleChange(e);
                        validateAccount(
                          values.bankCode || "",
                          values.accountNumber
                        );
                      }}
                    />
                  </div>
                </div>
                <P className="mb-5">{validAccountName && AccountName}</P>
                <div className="text-right">
                  <Button
                    className=""
                    type="submit"
                    color="primary"
                    size="md"
                    disabled={!validateAccount}
                    isLoading={isLoading}
                  >
                    Add Bank Account
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPayOutPayout;
