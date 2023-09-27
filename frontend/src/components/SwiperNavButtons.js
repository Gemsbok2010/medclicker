import React from "react";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "200px",
        }}
      >
        <button onClick={() => swiper.slidePrev()}>Backwards</button>
        <button onClick={() => swiper.slideNext()}>Forwards</button>
      </div>

      <style jsx="true">
        {`
          .swiper button {
            color: white;
            background-color: #14a248;
            border-radius: 4px;
            border: none;
            line-height: 30px;
            height: 30px;
            width: 85px;
            margin-top: 20px;
          }

          button:active,
          button:focus {
            outline: none;
          }

          button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
