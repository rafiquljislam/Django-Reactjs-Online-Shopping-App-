import { Container } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import AllCategoryProducts from "../components/AllCategoryProducts";
import AllBrand from "../components/brand/AllBrand";
import Sliders from "../components/carousel/Sliders";
import AllCategory from "../components/category/AllCategory";
import MostViewedProducts from "../components/MostViewedProducts";
import TrandingProduct from "../components/TrandingProduct";


const HomePage = () => {

  return (
    <>
      <Sliders />
      <Container>
        <TrandingProduct />
        <AllCategory />
        <MostViewedProducts />
        <AllCategoryProducts />
        <AllBrand />
      </Container>
    </>
  );
};

export default HomePage;
