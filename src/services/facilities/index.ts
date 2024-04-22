import { getRequest } from "@/utils/api/calls";

import type { IFacility } from "./payload";

const getAllFacilities = () => {
  return getRequest<{ Facilities: IFacility[] }>({
    url: `/facilities`
  });
};

export { getAllFacilities };
