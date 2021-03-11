import { Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import SliderItem from "./SliderItem";
import { domain } from '../../env'

const Sliders = () => {

  const [sliderdata, setSliderdata] = useState(null);
  useEffect(() => {
    const getslider = () => {
      Axios({
        url: `${domain}/api/slider/`,
        method: 'GET',
      }).then(response => {
        console.log(response.data);
        setSliderdata(response.data);
      }).catch(e => {
        console.log(e);
      })
    }
    getslider()
  }, [])
  return (
    <Grid style={{ marginTop: "64px" }}>
      {
        sliderdata !== null &&
        <Carousel interval="6000" stopAutoPlayOnHover="true">
          {sliderdata.map((item, i) => (
            <SliderItem key={i} item={item} />
          ))}
        </Carousel>
      }
    </Grid>
  );
};

export default Sliders;
