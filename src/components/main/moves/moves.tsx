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
      spaceBetween={10}
      slidesPerView={4}
      navigation
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
      direction="horizontal"
      className={style.swiperContainer}
    >
      {data.TendingNow.map((item, idx) => {
        const icon = new URL(`/src/assets/${item.CoverImage}`, import.meta.url)
          .href;
        return (
          <SwiperSlide
            key={idx}
            className={style.icons_container_item}
            onClick={() => onClick(item)}
          >
            <img src={icon} alt={`icon-${idx}`} className={style.icons_container_item_img}/>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
