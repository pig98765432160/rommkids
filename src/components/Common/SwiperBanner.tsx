import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageWithFallback from "./ImageWithFallback";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Props {
  data: any;
}

const SwiperBanner: FC<Props> = ({ data }) => {
  return (
    <Swiper loop={true} navigation={true} modules={[Navigation]}>
      {data.map((item: any, index: number) => (
        <SwiperSlide key={index} className="relative aspect-[640/240]">
          <ImageWithFallback
            width={1280}
            height={720}
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            priority={true}
            fallbackSrc={"/assets/image/common/slider_img_nophoto.jpg"}
          />
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <p className="absolute bottom-2 text-white font-black text-3xl p-5">
            {item.name}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperBanner;
