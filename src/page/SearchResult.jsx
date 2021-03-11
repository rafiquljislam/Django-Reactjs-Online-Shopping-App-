import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { domain } from '../env'
import { Container, Grid, Typography } from '@material-ui/core';
import Headline from '../components/product/Headline';
import SingleBrand from '../components/brand/SingleBrand'
import AllProduct from '../components/product/AllProduct';
import SingleCategory from '../components/category/SingleCategory';

const SearchResult = () => {
    const { query } = useParams();
    const [querydata, setQuerydata] = useState(null);
    useEffect(() => {
        const searchnow = async () => {
            await Axios({
                url: `${domain}/api/search/${query}/`,
                method: 'GET',
            }).then(response => {
                console.log(response.data);
                setQuerydata(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        searchnow()
    }, [query])
    return (
        <Container style={{ marginTop: "64px" }}>
            <Typography variant='h4'>Search Result For:"{query}"</Typography>
            <Grid container direction='column' >
                {
                    querydata?.brand?.length !== 0 &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Headline title="Brands" />
                        {
                            querydata?.brand?.map((item, i) =>
                                <Grid xs={6} sm={3} md={2} lg={2} key={i} item>
                                    <SingleBrand item={item} />
                                </Grid>)
                        }
                    </Grid>
                }
                {
                    querydata?.category?.length !== 0 &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Headline subtitle='Categorys' />
                        {
                            querydata?.category?.map((item, i) => (
                                <Grid xs={6} sm={3} md={2} lg={2} key={i} item>
                                    <SingleCategory item={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                }
                {
                    querydata?.posts?.length !== 0 &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Headline subtitle="Products" />
                        <AllProduct products={querydata?.posts} showall={true} />
                    </Grid>
                }
            </Grid>
        </Container>
    )
}

export default SearchResult
