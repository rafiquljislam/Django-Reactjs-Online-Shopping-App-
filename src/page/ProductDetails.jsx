import { Box, Button, Card, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { domain, header, header3 } from '../env'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useStateValue } from '../state/stateProvider';
import SingleReviow from '../components/SingleReviow';
import SendIcon from '@material-ui/icons/Send';

const ProductDetails = () => {
    const [{ profile }, dispatch] = useStateValue();

    const [reviewtitle, setReviewtitle] = useState('')

    const [viewproduct, setViewproduct] = useState(null)
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const history = useHistory();
    const brandProducts = () => {
        history.push(`/brand-${product?.brand?.title}-${product?.brand?.id}`)
    }
    const goCategory = (title, id) => {
        history.push(`/category-${title}-${id}`);
    }
    const addnewReview = async () => {
        if (profile === null) {
            history.push('/login')
            return;
        }
        await Axios({
            url: `${domain}/api/addreview/`,
            method: "POST",
            headers: header,
            data: {
                'pid': id,
                'title': reviewtitle,
            }
        }).then(response => {
            if (response.data['error'] === false) {
                setViewproduct(response.data)
                setReviewtitle('')
            } else {
                alert("Try Agane!")
            }
        }).catch(error => {
            console.log(error);
            alert("Try Agane!")
        })
    }
    useEffect(() => {
        const getProduct = async () => {
            await Axios({
                url: `${domain}/api/product/${id}/`,
                method: 'GET'
            }).then(response => {
                console.log(response.data);
                setProduct(response.data[0])
            }).catch(error => {
                console.log(error);
            })
        }
        getProduct()
    }, [viewproduct])
    useEffect(() => {
        const viewProduct = async () => {
            await Axios({
                url: `${domain}/api/viewproduct/`,
                method: 'POST',
                headers: header3,
                data: {
                    pid: id
                }
            }).then(response => {
                console.log(response.data);
                setViewproduct(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        viewProduct()
    }, [id])
    // const addtoFavorit = async () => {
    //     if (profile === null) {
    //         history.push('/login')
    //         return;
    //     }
    //     await Axios({
    //         url: `${domain}/api/addtofavorit/`,
    //         method: 'POST',
    //         headers: header,
    //         data: {
    //             pid: id
    //         }
    //     }).then(response => {
    //         console.log(response.data);
    //         setViewproduct(response.data)
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }
    const addtocart = async () => {
        if (profile === null) {
            history.push('/login')
            return;
        }
        await Axios({
            url: `${domain}/api/addtocart/`,
            method: 'POST',
            headers: header,
            data: {
                id: id
            }
        }).then(response => {
            let data = response.data
            console.log('addtocart', data);
            //  reload full app
            if (data['error'] === false) {
                dispatch({
                    type: 'RE',
                    value: data
                })
                //  give alert message
                dispatch({
                    type: 'MESSAGE',
                    value: { show: true, title: `${data['message']},ProductId=${data['productid']}` }
                })
                //  Colose alert message
                setTimeout(
                    function () {
                        dispatch({
                            type: 'MESSAGE',
                            value: { show: false, title: '' }
                        })
                        // console.log('dddd');
                    }
                        .bind(this),
                    3000
                );
            } else {
                dispatch({
                    type: 'MESSAGE',
                    value: { show: true, title: "Somthing is Wrong!! Try Agane" }
                })
            }
        }).catch(_ => {
            dispatch({
                type: 'MESSAGE',
                value: { show: true, title: "Somthing is Wrong!! Try Agane" }
            })
            //  Colose alert message
            setTimeout(
                function () {
                    dispatch({
                        type: 'MESSAGE',
                        value: { show: false, title: '' }
                    })
                    // console.log('dddd');
                }
                    .bind(this),
                3000
            );
        })
    }
    return (
        <Container style={{ marginTop: '78px' }} >
            <Card style={{ padding: '20px' }} >
                <Grid direction="row" container>
                    <Grid item xs={12} sm={12} md={5} lg={5} >
                        <img alt={product?.title} style={{ width: '100%', height: 'auto' }} src={product?.image} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}  >
                        <Grid style={{ marginLeft: '10px' }} container >
                            <Grid item xs={12} md={6} lg={6}>
                                <Typography variant='h4' >{product?.title}</Typography>
                                <Typography variant='h6' >
                                    {
                                        product?.category?.map((item, i) => <Button onClick={() => goCategory(item?.title, item?.id)} key={i}>{item?.title},</Button>)
                                    }
                                </Typography>
                                <Box>

                                    {
                                        product?.brand &&
                                        <Button onClick={brandProducts} variant='outlined' color='primary' style={{
                                            fontSize: '20px',
                                        }} >
                                            {product?.brand?.title}
                                        </Button>
                                    }
                                </Box>
                                <Box>
                                    {
                                        product?.discount > 0 &&
                                        <Box container='span' style={{
                                            fontSize: '40px',
                                        }} >
                                            {product?.discount}% OFF
                                    </Box>
                                    }
                                </Box>
                                <Typography>
                                    <Box component='span' style={{
                                        fontSize: '40px',
                                        color: 'red',
                                        textDecoration: 'line-through',
                                    }}  >
                                        {product?.oldprice} TK
                                </Box>
                                    <Box style={{
                                        fontSize: '40px',
                                        color: 'black'
                                    }} component='span' >
                                        {product?.price} TK
                                </Box>
                                </Typography>
                                <Button onClick={addtocart} variant='contained'>Add to Cart</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Card style={{
                                    padding: '10px',
                                    margin: '15px 0px',
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                }}>
                                    <Button
                                        color='primary'
                                        size='large'
                                        endIcon={
                                            <VisibilityIcon />
                                        }
                                    >{product?.view}
                                    </Button>
                                    {/* <Button
                                        color='secondary'
                                        size='large'
                                        onClick={addtoFavorit}
                                        endIcon={
                                            viewProductforme?.favorit === true ?
                                                <FavoriteIcon /> :
                                                <FavoriteBorderIcon />
                                        }
                                    >{product?.totalfavorit}
                                    </Button> */}
                                </Card>
                            </Grid>
                            <Box style={{ padding: '10px 0' }}>
                                <Typography variant='p'>{product?.details}</Typography>
                            </Box>

                        </Grid>

                        <Typography align='center' variant='h5' >Reviews</Typography>
                        <Box p={3}>
                            <TextField
                                value={reviewtitle}
                                onChange={(e) => setReviewtitle(e.target.value)}
                                label="Add Review......"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            disabled={reviewtitle.length <= 0 ? true : false}

                                            onClick={addnewReview}
                                            color="primary"
                                            component="span"
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    ),
                                }}
                                style={{ width: '100%' }} variant='outlined' />
                            {
                                product?.reviow?.map((item, i) => <SingleReviow key={i} item={item} />)
                            }
                        </Box>

                    </Grid>
                </Grid>
            </Card>
        </Container >
    )
}

export default ProductDetails
