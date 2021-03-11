import { Grid } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import Headline from '../product/Headline';
import { domain } from '../../env';
import { SingleBed } from '@material-ui/icons';
import SingleBrand from './SingleBrand';

const AllBrand = () => {
    const [allbrand, setAllbrand] = useState(null);
    useEffect(() => {
        const getallcategory = async () => {
            Axios({
                url: `${domain}/api/brandes/`,
                method: 'GET'
            }).then(response => {
                console.log(response.data);
                setAllbrand(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        getallcategory()
    }, [])

    return (
        <Grid spacing={2} container>
            <Headline title='All' subtitle='Brands' />
            {
                allbrand?.map((item, i) =>
                    <Grid xs={6} sm={3} md={2} lg={2} key={i} item>
                        <SingleBrand item={item} />
                    </Grid>
                )
            }
        </Grid>
    )
}

export default AllBrand
