import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TransactionTable from "@/components/Transactions/TransactionTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Business Table",
  description:
    "Page displaying the lists of Business on City Hotel",
};

const TransactionPage = () => {
  return (
    <DefaultLayout>
      <TransactionTable Limit={10} Filter={{}} />
    </DefaultLayout>
  );
};

export default TransactionPage;
