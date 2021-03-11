import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { domain, header } from '../../env'

const OldCartProducts = () => {
    const [oldorder, setOldorder] = useState(null);
    const { id } = useParams()
    const history = useHistory()
    const productsdetails = (title, id) => {
        history.push(`/product-${title}-${id}`)
    }
    useEffect(() => {
        const getoldOrders = async () => {
            await Axios({
                url: `${domain}/api/oldcart/${id}/`,
                method: 'GET',
                headers: header
            }).then(response => {
                console.log(response.data[0].cartproducts);
                setOldorder(response.data[0].cartproducts)
            }).catch(_ => {
                console.log('OldCartProducts');
            })
        }
        getoldOrders()
    }, [])
    return (
        <Container style={{ marginTop: '67px' }}>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >ID</TableCell>
                            <TableCell align="center" >Title</TableCell>
                            <TableCell align="center" >Price</TableCell>
                            <TableCell align="center" >Quantity</TableCell>
                            <TableCell align="center" >Discount</TableCell>
                            <TableCell align="center" >Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            oldorder?.map((item, i) =>
                                <TableRow key={i} onClick={() => productsdetails(item?.product[0]?.title, item?.product[0]?.id)}>
                                    <TableCell align="center" >{item?.id}</TableCell>
                                    <TableCell align="center" >{item?.product[0]?.title}</TableCell>
                                    <TableCell align="center" >{item?.product[0]?.price} TK</TableCell>
                                    <TableCell align="center" >{item?.quantity}</TableCell>
                                    <TableCell align="center" >{item?.product[0]?.discount} %</TableCell>
                                    <TableCell align="center" >{item?.total}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default OldCartProducts
