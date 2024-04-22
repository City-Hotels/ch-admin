import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CampaignTable from "@/components/Campaigns/CampaignTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Campaigns Table",
  description:
    "Page displaying Campaigns list on City Hotel",
};

const Campaigns = () => {
  return (
    <DefaultLayout>
      <CampaignTable Limit={9} Filter={{}} />
    </DefaultLayout>
  );
};

export default Campaigns;
