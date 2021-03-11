import { Box, Button, Card, CardActionArea, Grid, Typography } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { domain, header } from '../../env'
import { useStateValue } from '../../state/stateProvider';
import Axios from 'axios';

const SingleCartItem = ({ item, total, quantity, cpid }) => {
    // console.log(item);
    const [{ }, dispatch] = useStateValue();

    const addtocart = async () => {
        await Axios({
            url: `${domain}/api/addtocart/`,
            method: 'POST',
            headers: header,
            data: {
                id: item?.id
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
                3000
            );
        })
    }
    const removecartitem = async () => {
        await Axios({
            url: `${domain}/api/editcartproduct/`,
            method: 'POST',
            headers: header,
            data: {
                cpid: cpid,
                pid: item?.id
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
                    10000
                );
            } else {
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
    const delateecartitem = async () => {
        await Axios({
            url: `${domain}/api/delatecartproduct/`,
            method: 'POST',
            headers: header,
            data: {
                cpid: cpid,
                pid: item?.id
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
                    10000
                );
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
        <Grid container alignItems='center' spacing={1} style={{ padding: '10px' }} >
            <Grid item>
                <CardActionArea>
                    <img style={{ height: '140px', width: '130px' }} src={item?.image} />
                </CardActionArea>
            </Grid>
            <Grid item style={{ flexGrow: '1' }}>
                <CardActionArea>
                    <Typography variant='h6'>{item?.title}</Typography>
                </CardActionArea>
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        {
                            item?.category?.map((cat, i) => <Button size='small' key={i} variant='outlined' color='primary' >{cat?.title}</Button>)
                        }
                    </Grid>
                    <Grid item>
                        {
                            item?.brand !== null &&
                            <Button variant='contained' size='small' color='primary'>{item?.brand?.title}</Button>
                        }
                    </Grid>
                    <Grid item>
                        <Box>
                            <Button disabled={quantity === 1 ? true : false} onClick={removecartitem} variant='outlined' color='secondary' >-</Button>
                            <Button style={{ fontWeight: 'bold', fontSize: '20px' }}>{quantity}</Button>
                            <Button onClick={addtocart} variant='outlined' color='primary' >+</Button>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Card style={{ padding: '10px', fontWeight: 'bold', fontSize: '20px' }} TK>
                            Total : {total}
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button onClick={delateecartitem} variant='contained' color='secondary' endIcon={
                    <DeleteIcon />
                }>Delate</Button>
            </Grid>
        </Grid>
    )
}

export default SingleCartItem
