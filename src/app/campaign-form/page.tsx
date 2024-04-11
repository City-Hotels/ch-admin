"use client"
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TabComponent from "@/components/Tab/Tab";
import PersonalInfo from "@/components/Tab Component/PersonalInfo";
import Requirements from "@/components/Tab Component/Requirements";
import Price from "@/components/Tab Component/Price";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | CHB Admin - Dashboard",
//   description:
//     " Form Layout page for CHB Admin - Next.js Tailwind CSS Admin Dashboard Template"
// };


const FormLayout = () => {
  return (
    <DefaultLayout>
      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h1 className="font-medium text-black dark:text-white">
                Campaign Form
              </h1>
            </div>
            <form action="#">
              <div className="p-6.5">
                <TabComponent
                  tabs={[
                    {
                      title: "PersonalInfo",
                      Component: PersonalInfo
                    },
                    {
                      title: "Requirements",
                      Component: Requirements
                    },
                    {
                      title: "Price",
                      Component: Price
                    },
                  ]}
                  title={""}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
