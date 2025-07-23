import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";
export default function MainSlider() {
  return (
    <>
      <div className="container pt-5">
        <div className="row g-0">
          <div className="col-8">
            <Slider autoplay autoplaySpeed={3000} arrows={false} dots={true}>
              <div className="">
                <img className="w-100" src={sliderImg1} height={350} alt="" />
              </div>
              <div className="">
                <img className="w-100" src={sliderImg2} height={350} alt="" />
              </div>
              <div className="">
                <img className="w-100" src={sliderImg3} height={350} alt="" />
              </div>
            </Slider>

          </div>
          <div className="col-4">
            <div className="">
              <img className="w-100" src={sliderImg2} height={175} alt="" />
              <img className="w-100" src={sliderImg3} height={175} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
