import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Headline from './product/Headline';
import Axios from 'axios'
import { domain } from '../env'
import SingleProduct from './product/SingleProduct';

const TrandingProduct = () => {
  const [tranding, setTranding] = useState(null);
  useEffect(() => {
    const gettranding = () => {
      Axios({
        url: `${domain}/api/tranding/`,
        method: 'GET',
      }).then(response => {
        setTranding(response.data)
      }).then(_ => {
        console.log("error");
      })
    }
    gettranding()
  }, [])
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
      <Headline title="Trending" subtitle="Products" />
      {tranding?.map((item, i) => (
        <Grid key={i} item md={2} sm={4}>
          <SingleProduct item={item?.products[0]} />
        </Grid>
      ))}

    </Grid>

  )
}

export default TrandingProduct
