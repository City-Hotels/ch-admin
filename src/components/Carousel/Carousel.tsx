import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg";
import styles from "./Carousel.module.scss";
import Img from "../Image/Image";
import Modal from "../Modal/Modal";
import MediaForm from "../MediaForm/MediaForm";
import CarouselProps from "./Carousel.props";

const Carousel: React.FC<CarouselProps> = ({
  medias,
  autoSlide,
  activeClassName,
  thumbnailClassName,
  interval = 5000,
  onUpdate,
  onImageDelete
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditMediaModalOpen, setIsEditMediaModalOpen] = useState(false);

  useEffect(() => {
    if (autoSlide) {
      const nextIndex = activeIndex + 1 >= medias.length ? 0 : activeIndex + 1;
      const timer = setInterval(() => setActiveIndex(nextIndex), interval);
      return () => {
        clearInterval(timer);
      };
    }
    return () => undefined;
  }, [activeIndex]);

  return (
    <div className="w-full">
      {medias.length > 0 ? (
        <div className={`${styles.active} ${activeClassName}`}>
          <Img
            path={medias[activeIndex]?.Path || ""}
            name={medias[activeIndex]?.Path || ""}
            className={` size-full ${activeClassName}`}
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditMediaModalOpen(true)}
          className={`mx-auto flex h-[300px] items-center justify-center border text-center lg:h-[400px] xl:h-[525px] xl:max-w-[684px] ${activeClassName}`}
        >
          <span className="text-[12px] text-primary400">
            Drag or select photos
          </span>
        </div>
      )}
      <div className=" mt-4 hidden max-w-full items-center justify-center gap-2 overflow-x-scroll lg:flex">
        <span
          className={styles.chevronLeftIcon}
          onClick={() =>
            setActiveIndex(activeIndex - 1 < 0 ? 0 : activeIndex - 1)
          }
        >
          <ChevronLeftIcon />
        </span>
        {medias
          .filter((_item, index) => index < 4)
          .map((item, index) => (
            <div
              onClick={() => setActiveIndex(index)}
              className={`${styles.img} ${activeIndex === index ? "border border-primary400" : ""
                } ${thumbnailClassName}`}
              key={item.Path}
            >
              <Img
                path={item.Path}
                name={item.Path}
                className={`size-full ${thumbnailClassName}`}
              />
            </div>
          ))}
        {/* </div> */}
        {onUpdate && (
          <div
            onClick={() => setIsEditMediaModalOpen(true)}
            className={`flex h-[100px] cursor-pointer items-center border text-center text-[10px] hover:border-primary400 lg:h-[90px] lg:w-[100px] xl:h-[146px] xl:w-[164px] ${thumbnailClassName}`}
          >
            <span className="w-full">
              {medias.length > 0 ? "EDIT" : "ADD"}
              <br /> PHOTOS
            </span>
          </div>
        )}
        <span
          className={styles.chevronRightIcon}
          onClick={() =>
            setActiveIndex(
              activeIndex + 1 >= medias.length ? 0 : activeIndex + 1
            )
          }
        >
          <ChevronRightIcon />
        </span>
      </div>
      {onUpdate && onImageDelete && (
        <Modal
          openModal={isEditMediaModalOpen}
          setOpenModal={setIsEditMediaModalOpen}
          variant="filled"
        >
          <section>
            <MediaForm
              onSelect={onUpdate}
              previousFiles={medias || []}
              onDelete={onImageDelete}
            />
          </section>
        </Modal>
      )}
    </div>
  );
};

export default Carousel;
