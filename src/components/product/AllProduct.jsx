import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import SingleProduct from "./SingleProduct";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import { useHistory } from "react-router-dom";

const AllProduct = ({ products, showall = false, categorytitle, categoryid }) => {
  const history = useHistory();
  const goCategory = () => {
    history.push(`/category-${categorytitle}-${categoryid}`);
  }
  return (
    <Grid
      style={{
        marginTop: "15px",
      }}
      spacing={2}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {products?.map((item, i) => (
        <>
          {
            showall ?
              <Grid key={i} item md={2} sm={4}>
                <SingleProduct item={item} />
              </Grid>
              :
              <>
                {
                  i <= 10 &&
                  <Grid key={i} item md={2} sm={4}>
                    <SingleProduct item={item} />
                  </Grid>

                }
              </>
          }
        </>
      ))}
      {
        (products?.length > 11 && !showall) &&
        <Grid
          item
          md={2}
          sm={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => goCategory()}>
            <Typography>See More</Typography>
            <DoubleArrowSharpIcon />
          </Button>
        </Grid>
      }
    </Grid>
  );
};

export default AllProduct;
