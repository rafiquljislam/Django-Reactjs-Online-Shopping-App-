import { Button, Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { domain, header } from '../env';
import { useStateValue } from '../state/stateProvider';

const OrderNow = () => {
    const [{ profile }, dispatch] = useStateValue();

    // console.log('OrderNow', profile);
    const { cartid } = useParams()
    console.log('cartid', cartid);
    const history = useHistory();
    const mycart = () => {
        history.push('/mycart')
    }
    const [name, setName] = useState(profile?.name);
    const [email, setEmail] = useState(profile?.user?.email);
    const [phone, setPhone] = useState(profile?.mobile)
    const [address, setAddress] = useState(profile?.Address)
    const [cashondelivary, setCashondelivary] = useState(false)

    const ordernow = async () => {
        await Axios({
            url: `${domain}/api/ordernow/`,
            method: 'POST',
            headers: header,
            data: {
                'cart': cartid,
                'name': name,
                'mobile': phone,
                'address': address,
                'email': email
            }
        }).then(response => {
            let data = response.data
            console.log('ordernow', data);
            //  reload full app
            if (data['error'] === false) {
                dispatch({
                    type: 'RE',
                    value: data
                })
                //  give alert message
                dispatch({
                    type: 'MESSAGE',
                    value: { show: true, title: `${data['message']}` }
                })
                //  ggg
                history.push('/oldorder')
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
        <Container style={{ marginTop: '85px' }}>
            <Card style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                margin: '30px 0',
            }}>
                <Typography style={{
                    fontWeight: 'bold',
                    padding: '0 20px',
                    fontSize: '20px',
                }}>Total: 434343 TK</Typography>
                <Button onClick={mycart} size='large' variant="contained" color='secondary' >Edit Cart</Button>
            </Card>
            <Grid container spacing={2}>
                <Grid item md={4} lg={4} sm={6} xs={12} >
                    <TextField style={{ width: '100%' }} onChange={(e) => setName(e.target.value)} value={name} label="Name" variant="outlined" />
                </Grid>
                <Grid item md={4} lg={4} sm={6} xs={12} >
                    <TextField style={{ width: '100%' }} onChange={(e) => setEmail(e.target.value)} value={email} label="Email" variant="outlined" />
                </Grid>
                <Grid item md={4} lg={4} sm={6} xs={12} >
                    <TextField style={{ width: '100%' }} onChange={(e) => setPhone(e.target.value)} value={phone} label="Phone Number" variant="outlined" />
                </Grid>
                <Grid item md={8} lg={8} sm={8} xs={8} >
                    <TextField style={{ width: '100%' }} onChange={(e) => setAddress(e.target.value)} value={address} label="Address" variant="outlined" />
                </Grid>
                <Grid item md={4} lg={4} sm={4} xs={4} >
                    <FormControlLabel control={<Checkbox onClick={() => setCashondelivary(!cashondelivary)} name="checkedC" />} label="Cash on Delivery" />

                </Grid>
            </Grid>
            <Card style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                margin: '30px 0',
            }}>
                <Button onClick={ordernow} size='large' variant="contained" color='primary' >Order</Button>
            </Card>
        </Container>
    )
}

export default OrderNow
