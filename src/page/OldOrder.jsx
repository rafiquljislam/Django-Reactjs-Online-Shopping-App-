import { Button, Card, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useStateValue } from '../state/stateProvider';
const OldOrder = () => {
    const [oldorder, setOldorder] = useState(null);
    const history = useHistory();
    const [{ reload }, dispatch] = useStateValue();
    useEffect(() => {
        const getoldOrders = async () => {
            Axios({
                url: `${domain}/api/oldcart/`,
                method: 'GET',
                headers: header
            }).then(response => {
                console.log(response.data);
                setOldorder(response.data)
            }).catch(_ => {
                console.log('OldOrder error');
            })
        }
        getoldOrders()
    }, [reload])
    const delateoldorder = async (id) => {
        await Axios({
            url: `${domain}/api/delateoldorder/`,
            method: 'POST',
            headers: header,
            data: {
                id: id
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
        <Container style={{ marginTop: '67px' }}>
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
                }}>Order History </Typography>
            </Card>
            <TableContainer component={Paper}>

                {oldorder === null || oldorder.length <= 0 &&
                    <Typography align='center' variant='h2'>You Have No Order History!</Typography>
                }
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >SN</TableCell>
                            <TableCell align="center" >Total(TK)</TableCell>
                            <TableCell align="center" >Name</TableCell>
                            <TableCell align="center" >Date</TableCell>
                            <TableCell align="center" >Mobile</TableCell>
                            <TableCell align="center" >Email</TableCell>
                            <TableCell align="center" >Address</TableCell>
                            <TableCell align="center" >Product(Count)</TableCell>
                            <TableCell align="center" >Order Status</TableCell>
                            <TableCell align="center" >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            oldorder?.map((item, i) =>
                                <>
                                    <TableRow key={i} >
                                        <TableCell align="center" >{i}</TableCell>
                                        <TableCell align="center" >{item?.cart?.total}</TableCell>
                                        <TableCell align="center" >{item?.name}</TableCell>
                                        <TableCell align="center" >{item?.date}</TableCell>
                                        <TableCell align="center" >{item?.mobile}</TableCell>
                                        <TableCell align="center" >{item?.email}</TableCell>
                                        <TableCell align="center" >{item?.address}</TableCell>
                                        <TableCell align="center" >{item?.cartproducts?.length}</TableCell>
                                        <TableCell align="center" >{item?.order_status}</TableCell>
                                        <TableCell align="center" >
                                            <Button
                                                onClick={() => delateoldorder(item?.id)}
                                                variant='contained' color='secondary'>Delete</Button>
                                            <Button onClick={() => {
                                                history.push(`/oldorderdetails-${item?.id}`)
                                            }} variant='contained' color='primary'>Details</Button>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default OldOrder
