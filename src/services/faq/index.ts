import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest
} from "@/utils/api/calls";

import type { IFAQ } from "./payload";

const createServiceFaq = (faq: IFAQ, hotelid: string) => {
  return postRequest<IFAQ, any>({
    url: `/faq/${faq.ServiceType.toLowerCase()}/${hotelid.toLowerCase()}`,
    data: faq
  });
};
const getServiceFaqs = (
  serviceId: string,
  serviceType: "Apartment" | "Hotel"
) => {
  return getRequest<{ Faqs: IFAQ[] }>({
    url: `/faq/${serviceType.toLowerCase()}/${serviceId}`
  });
};
const updateServiceFaq = (faq: IFAQ, hotelId: string) => {
  return patchRequest<IFAQ, any>({
    url: `/faq/${faq.ServiceType.toLowerCase()}/${hotelId}`,
    data: faq
  });
};
const deleteServiceFaq = (
  faqId: string,
  serviceType: "Apartment" | "Hotel" = "Apartment"
) => {
  return deleteRequest({
    url: `/faq/${serviceType.toLowerCase()}/${faqId}`
  });
};

export { createServiceFaq, updateServiceFaq, getServiceFaqs, deleteServiceFaq };
