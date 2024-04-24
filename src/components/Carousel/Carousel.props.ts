import type { IMedia } from "@/services/hotel/payload";
import type { ApiResponse } from "@/utils/api/calls";

export default interface CarouselProps {
  medias: IMedia[];
  autoSlide?: boolean;
  interval?: number;
  activeClassName?: string;
  thumbnailClassName?: string;
  onImageDelete?: (itemId: string, path: string) => void;
  onUpdate?: (
    itemId: string,
    data: FormData,
    setProgress: Function
  ) => Promise<ApiResponse<{ Path: string }>>;
}
