import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  let [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
   
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="container py-5">
        <h3 className="text-main">Popular Shop Categories</h3>
        <div className="row g-0 my-3">
          <Slider
            slidesToShow={4}
            slidesToScroll={4}
            infinite={true}
            dots={true}
            arrows={false}
            responsive={[
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ]}
          >
            {categories.map((ele) => {
              return (
                <div className="">
                  <img className="w-100" src={ele.image} height={300} alt="" />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
