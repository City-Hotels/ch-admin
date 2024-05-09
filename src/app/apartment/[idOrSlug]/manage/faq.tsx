import Button from "@/components/shared/button/Button";
import UserLayout from "@/layout/user/User";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import type { IFAQ } from "@/services/faq/payload";
import React from "react";
import { H3, P, P2 } from "@/components/shared/headings/Headings";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg";
import queryKeys from "@/utils/api/queryKeys";
import {
  createServiceFaq,
  getServiceFaqs,
  updateServiceFaq,
  deleteServiceFaq
} from "@/services/faq";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import FAQForm from "@/components/Faq/FAQForm";
import { ServiceTypes } from "@/utils/enums";

const FAQItem: React.FC<
  IFAQ & {
    ServiceId: string;
    onDelete: Function;
    onUpdate: Function;
  }
> = ({ Id, Question, Answer, onUpdate, ServiceId, onDelete }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate, isLoading } = useMutation(updateServiceFaq);
  const { mutate: deleteFaq, isLoading: isDeletingFaq } =
    useMutation(deleteServiceFaq);

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
              ServiceType: "Apartment",
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
  const router = useRouter();
  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutate: createFaq, isLoading: isCreatingFaq } =
    useMutation(createServiceFaq);

  const { data, refetch } = useQuery(
    [queryKeys.getServiceFAQs],
    () => {
      const res = getServiceFaqs(
        slug?.toString() || "",
        ServiceTypes.APARTMENT
      );
      return res;
    },
    {
      enabled: !!slug // Would only make this request if slug is truthy
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
    <UserLayout>
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
              ServiceId: apartmentId,
              ServiceType: "Apartment",
              Question: "",
              Answer: ""
            }}
          />
        )}

        {((data?.data.Faqs as IFAQ[]) || []).map((item) => (
          <FAQItem
            {...item}
            key={item.Id}
            ServiceId={apartmentId}
            onUpdate={refetch}
            onDelete={refetch}
          />
        ))}
      </div>
    </UserLayout>
  );
};

export default FAQ;
