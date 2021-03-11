import { Box, Container, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllProduct from '../components/product/AllProduct';
import Headline from '../components/product/Headline';
import { domain } from '../env'

const SingleCategoryProducts = () => {
    const { id } = useParams();
    const [catagory, setCatagory] = useState(null);
    useEffect(() => {
        const getproduct = () => {
            Axios({
                url: `${domain}/api/category/${id}/`,
                method: 'GET'
            }).then(response => {
                console.log(response.data);
                setCatagory(response.data)
            })
        }
        getproduct()
    }, [id])
    return (
        <Container style={{ marginTop: '64px' }} >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant='h3' >{catagory?.title}</Typography>
                <Typography variant='p' >{catagory?.details}</Typography>
                <img style={{ width: '100%', padding: '10px' }} alt={catagory?.title} src={catagory?.image} />
                <AllProduct products={catagory?.product} showall={true} />
            </Grid>
        </Container>
    )
}

export default SingleCategoryProducts
