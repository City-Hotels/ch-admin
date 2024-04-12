import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CampaignsTable from "@/components/Campaigns/CampaignsTable";

export const metadata: Metadata = {
  title: "City Hotel Backend Admin  Campaigns Table",
  description:
    "Page displaying Campaigns list on City Hotel",
};

const Campaigns = () => {
  return (
    <DefaultLayout>
      <CampaignsTable Limit={9} Filter={{}} />
    </DefaultLayout>
  );
};

export default Campaigns;
