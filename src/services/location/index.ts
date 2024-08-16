import { getRequest } from "@/utils/api/calls";

import type { INewLocation } from "./payload";

const getLocation = (location: string) => {
  return getRequest<INewLocation>({
    url: `/geolocation/search?query=${location}`
  });
};

export { getLocation };
