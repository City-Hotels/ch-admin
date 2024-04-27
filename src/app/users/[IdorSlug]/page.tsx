"use client";
import Apartment from "@/components/Apartment";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReservationHistory from "@/components/Bookings/BookingTable";
import { getUser } from "@/services/user";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { IUser } from "@/services/user/payload";
import { useParams } from "next/navigation";
import Img from "@/components/Image/Image";
import { H3, P2 } from "@/components/Headings/Headings";
import ButtonLink from "@/components/Button/Link/Link";
import TransactionTable from "@/components/Transactions/TransactionTable";

const Profile = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const { isLoading, isError, data } = useQuery(
    [queryKeys.getUserByID],
    () => getUser(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );
  const user = (data?.data as IUser) || [];
  console.log(user);

  return (
    <DefaultLayout>
      {!user ? isLoading :  (
        <div>
          <div className="mt-10 mb-5 flex items-center justify-between gap-6 ">
            <div className="flex items-center gap-6">
              {user?.ImageUrl ? (
                <Img
                  className="h-[88px] w-[88px] rounded-full border"
                  path={user.ImageUrl || ""}
                  name={"user avatar"}
                />
              ) : (
                <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full border bg-black font-matter-bold text-white">
                  {user?.Firstname?.[0]} {user?.Lastname?.[0]}{" "}
                </span>
              )}
              <div>
                <H3>Welcome Back, {user?.Firstname} </H3>
                <P2 className="mt-2 text-[#7A7A7A]">{user?.Email}</P2>
              </div>
            </div>
            <div className="hidden lg:block">
              <ButtonLink color="muted" size="md" href="/user/manage">
                Manage account
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <ReservationHistory Limit={5} Filter={{HostId: user.Id}} />
            <Apartment Limit={6} Filter={{HostId: user.Id}} />
            <TransactionTable Limit={5} Filter={{ UserId: user.Id }} />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Profile;
