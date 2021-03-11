import { Container, Grid, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllProduct from '../components/product/AllProduct';
import { domain } from '../env'

const SingleBrandProducts = () => {
    const { id } = useParams();
    const [brand, setbrand] = useState(null);
    useEffect(() => {
        const getproduct = () => {
            Axios({
                url: `${domain}/api/brande/${id}/`,
                method: 'GET'
            }).then(response => {
                console.log(response.data);
                setbrand(response.data)
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
                <Typography variant='h3' >{brand?.title}</Typography>
                <Typography variant='p' >{brand?.details}</Typography>
                <img style={{ width: '100%', padding: '10px' }} alt={brand?.title} src={brand?.logo} />
                <AllProduct products={brand?.product} showall={true} />
            </Grid>
        </Container>
    )
}

export default SingleBrandProducts
