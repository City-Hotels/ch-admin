"use client"
import Button from "@/components/Button/Button";
import { useMutation, useQuery } from "react-query";
import type { IFAQ } from "@/services/faq/payload";
import React from "react";
import { H3, P, P2 } from "@/components/Headings/Headings";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg";
import queryKeys from "@/utils/api/queryKeys";
import {
  createServiceFaq,
  getServiceFaqs,
  updateServiceFaq,
  deleteServiceFaq
} from "@/services/faq";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import FAQForm from "@/components/Faq/FAQForm";
import { ServiceTypes } from "@/utils/enums";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";
import { IHotel } from "@/services/hotel/payload";
import { getHotel } from "@/services/hotel";

const FAQItem: React.FC<
  IFAQ & {
    ServiceId: string;
    onDelete: Function;
    onUpdate: Function;
  }
> = ({ Id, Question, Answer, onUpdate, ServiceId, onDelete, ServiceType }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { mutate, isLoading } = useMutation(updateServiceFaq);
  const { mutate: deleteFaq, isLoading: isDeletingFaq } = useMutation(
    (id: string) => deleteServiceFaq(id, "Hotel")
  );

  const onSubmit = (faq: IFAQ) => {
    mutate(faq, {
      onSuccess({ message }) {
        onUpdate(faq);
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  const remove = () => {
    deleteFaq(Id || "", {
      onSuccess({ message }) {
        onDelete();
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <div className="mb-5 cursor-pointer bg-[#F4F4F4] px-5 py-4">
      <div className="flex justify-between" onClick={() => setIsOpen(!isOpen)}>
        <P weight="bold">{Question}</P>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>

      {isOpen && (
        <div className="mt-9">
          <FAQForm
            type="update"
            onSubmit={onSubmit}
            onCancel={() => setIsOpen(false)}
            onDelete={remove}
            isSubmitting={isLoading}
            isDeleting={isDeletingFaq}
            initialValues={{
              ServiceId,
              ServiceType,
              Question,
              Answer,
              Id
            }}
          />
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutate: createFaq, isLoading: isCreatingFaq } =
    useMutation(createServiceFaq);

  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const { data: hotelRes } = useQuery(
    [queryKeys.getHotelByID, idOrSlug],
    () => getHotel(idOrSlug?.toString()),
    {
      enabled: !!idOrSlug
    }
  );
  const hotel = hotelRes?.data as IHotel;

  const { refetch, data } = useQuery(
    [queryKeys.getServiceFAQs],
    () => {
      const res = getServiceFaqs(hotel?.Slug || "", ServiceTypes.HOTEL);
      return res;
    },
    {
      enabled: !!idOrSlug
    }
  );

  const onSubmit = (faq: IFAQ) => {
    createFaq(faq, {
      onSuccess({ message }) {
        refetch();
        setIsOpen(false);
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <H3>FAQs</H3>
      <P2 className="my-7">
        Add questions and answers that your guests might be interested in asking
        {!isOpen && (
          <Button
            color="text"
            variant="text"
            className="ml-5 text-primary400"
            onClick={() => setIsOpen(true)}
          >
            + Add FAQ
          </Button>
        )}
      </P2>
      <div className="max-w-[815px]">
        {isOpen && (
          <FAQForm
            type="add"
            onSubmit={onSubmit}
            onCancel={() => setIsOpen(false)}
            isSubmitting={isCreatingFaq}
            initialValues={{
              ServiceId: "",
              ServiceType: "Hotel",
              Question: "",
              Answer: ""
            }}
          />
        )}

        {((data?.data.Faqs as IFAQ[]) || []).map((item) => (
          <FAQItem
            {...item}
            key={item.Id}
            ServiceId={""}
            onUpdate={refetch}
            onDelete={refetch}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default FAQ;
