import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const SliderItem = ({ item }) => {

  const history = useHistory();
  const sliderbutton = () => {
    if (item?.product !== null) {
      history.push(`/product-${item?.product?.title}-${item?.product?.id}`)
    } else if (item?.url?.length > 5) {
      window.location.assign(item?.url)
    }
    else {
      alert('There is No URL')
    }
  }

  return (
    <Paper
      style={{
        height: "400px",
        width: "100%",
        backgroundSize: "100% 400px",
        backgroundImage: `url(${item.image})`,
      }}
    >
      <Grid
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography style={{ color: 'white' }} variant="h3">{item.name}</Typography>
        <Typography style={{ color: 'white' }} variant="h6">{item.details}</Typography>

        <Button onClick={sliderbutton} color="primary" variant="contained">
          Learn More
        </Button>
      </Grid>
    </Paper>
  );
};

export default SliderItem;
