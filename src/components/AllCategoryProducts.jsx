import { Box, Grid } from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { domain } from '../env'
import AllProduct from './product/AllProduct'
import Headline from './product/Headline'

const AllCategoryProducts = () => {
    const [categorys, setCategorys] = useState(null);
    useEffect(() => {
        const catProducts = () => {
            Axios({
                url: `${domain}/api/products/`,
                method: 'GET',
            }).then(response => {
                // console.log(response.data);
                setCategorys(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        catProducts()
    }, [])
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
        >
            {
                categorys?.map((cat, i) => (

                    <Box container='div' key={i}>
                        {
                            cat?.products?.length !== 0 &&
                            <>
                                <Headline title={cat?.title} subtitle="Products" />
                                <AllProduct products={cat?.products} categorytitle={cat?.title} categoryid={cat?.id} />
                            </>
                        }
                    </Box>

                ))
            }
        </Grid>
    )
}

export default AllCategoryProducts
