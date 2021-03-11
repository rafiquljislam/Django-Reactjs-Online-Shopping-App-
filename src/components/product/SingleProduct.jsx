import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Axios from 'axios';
import { domain, header } from '../../env'
import { useStateValue } from '../../state/stateProvider'


const SingleProduct = ({ item }) => {
  const [{ profile }, dispatch] = useStateValue();
  const history = useHistory();
  const productsdetails = () => {
    history.push(`/product-${item?.title}-${item?.id}`)
  }
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

  return (
    <Card>
      <CardActionArea onClick={productsdetails}>
        <CardMedia component="img" height="250" image={item?.image} />
      </CardActionArea>
      <CardActionArea onClick={productsdetails}>
        <CardContent>
          <Typography align='center' variant='h6' >
            {item?.title}
          </Typography>
          <Typography align="center">
            {
              item?.oldprice &&
              <Box style={{
                fontWeight: 'bold',
                fontSize: 'larger',
                textDecoration: 'line-through',
                color: 'red',
                padding: '5px',
              }} component="span">
                {item?.oldprice}tk
              </Box>
            }
            <Box style={{
              fontWeight: 'bold',
              fontSize: 'larger',
              color: 'blue',
              padding: '5px',
            }} component="span">{item?.price}tk</Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button onClick={addtocart} endIcon={
          <AddShoppingCartIcon />
        } variant='outlined' size="large" color="primary">
          Add To Cart
          </Button>

      </CardActions>
    </Card>
  );
};

export default SingleProduct;
