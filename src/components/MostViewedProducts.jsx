import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Headline from './product/Headline';
import Axios from 'axios'
import { domain } from '../env'
import SingleProduct from './product/SingleProduct';

const MostViewedProducts = () => {
    const [tranding, setTranding] = useState(null);
    useEffect(() => {
        const gettranding = () => {
            Axios({
                url: `${domain}/api/mostviewproduct/`,
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
            <Headline title="Most Viewed" subtitle="Products" />
            {tranding?.map((item, i) => (
                <Grid key={i} item md={2} sm={4}>
                    <SingleProduct item={item?.product[0]} />
                </Grid>
            ))}

        </Grid>

    )
}

export default MostViewedProducts
