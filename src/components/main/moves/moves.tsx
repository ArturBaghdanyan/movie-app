import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Data, Item } from "@/types/moveTypes";

import style from "./style.module.scss";

interface ImageTrackListProps {
  data: Data;
  onClick: (move: Item) => void;
}

export const MoveList = ({ data, onClick }: ImageTrackListProps) => {
  return (
    <Swiper
      spaceBetween={3}
      slidesPerView={8}
      navigation
      direction="horizontal"
      className={style.swiperContainer}
    >
      {data.TendingNow.map((item, idx) => {
        const icon = `/src/assets/${item.CoverImage}`;
        return (
          <SwiperSlide
            key={idx}
            className={style.icons_container_item}
            onClick={() => onClick(item)}
          >
            <img src={icon} alt={`icon-${idx}`} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
