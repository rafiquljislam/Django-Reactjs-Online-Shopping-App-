import { Box, Button, Card, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Headline from '../components/product/Headline'
import { useStateValue } from '../state/stateProvider';
import { domain, header } from '../env'
import Axios from 'axios';
import SingleCartItem from '../components/cart/SingleCartItem';
import { useHistory } from 'react-router-dom';

const MyCart = () => {
    const [{ reload }, dispatch] = useStateValue();
    const [mycart, setMycart] = useState(null);
    const history = useHistory();
    const orderpage = () => {
        history.push(`/order-${mycart?.id}`)
    }
    const oldorderpage = () => {
        history.push('/oldorder')
    }

    useEffect(() => {
        const getmyCart = async () => {
            await Axios({
                url: `${domain}/api/mycart/`,
                method: 'GET',
                headers: header,
            }).then(response => {
                let data = response.data
                console.log("MY Card", data);
                setMycart(data)

            }).catch(_ => {
                console.log("MY Cart Error");
            })
        }
        getmyCart()

    }, [reload])

    const delateecartitem = async () => {
        await Axios({
            url: `${domain}/api/delatecart/`,
            method: 'POST',
            headers: header,
            data: {
                id: mycart?.id
            }
        }).then(response => {
            let data = response.data
            console.log('removecartitem', data);
            //  reload full app
            if (data['error'] === false) {
                dispatch({
                    type: 'RE',
                    value: data
                })
                //  give alert message
                dispatch({
                    type: 'MESSAGE',
                    value: { show: true, title: `${data['message']}}` }
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
                    10000
                );
                history.push('/')
            } else {
                dispatch({
                    type: 'MESSAGE',
                    value: { show: true, title: "Somthing is Wrong!! Try Agane" }
                })
                //  Colose alert message
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
                10000
            );
        })
    }

    return (
        <Container style={{ marginTop: '70px' }}>
            <Headline title="MY" subtitle="Cart" />
            <Grid container>
                <Grid item lg={8} md={8} sm={12}>
                    <Card style={{ margin: '5px' }}>
                        {
                            mycart?.total <= 0 || mycart === null ?
                                <Typography align='center' variant='h2'>There is No Cart!</Typography>
                                :
                                mycart?.cartproducts?.map((item, i) =>
                                    <SingleCartItem
                                        key={i}
                                        total={item?.total}
                                        quantity={item?.quantity}
                                        item={item?.product[0]}
                                        cpid={item?.id}
                                    />)
                        }

                    </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                    <Card style={{ margin: '5px' }}>
                        <Typography align='center' style={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            padding: '20px',
                            fontSize: '20px',
                        }} >Order SUMMary</Typography>
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            flexDirection: 'column',
                        }}>
                            <Box style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: '15px',
                            }}>
                                <Typography variant="h6" >Total: </Typography>
                                <Typography variant="h6" >{mycart?.total} TK</Typography>
                            </Box>
                            <Box style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: '15px',
                            }}>
                                <Typography variant="h6" >Products: </Typography>
                                <Typography variant="h6" >{mycart?.cartproducts?.length}</Typography>
                            </Box>
                        </Box>
                        <Box style={{ textAlign: 'center', padding: "10px" }}>
                            <Button disabled={mycart?.total <= 0 || mycart === null ? true : false} size='large' color='primary' variant='contained' onClick={orderpage} >Order Now</Button>
                            <Button size='large' color='primary' variant='outlined' onClick={oldorderpage}  >Old Orders</Button>
                            <Button onClick={delateecartitem} disabled={mycart?.total <= 0 || mycart === null ? true : false} size='large' color='secondary' variant='contained' >Delate Cart</Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MyCart
