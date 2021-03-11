import {
  AppBar,
  Badge,
  Button,
  Card,
  ClickAwayListener,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../state/stateProvider";
import Alert from "@material-ui/lab/Alert";
import { domain, header } from '../env';
import Axios from "axios";

const Navbar = () => {
  const [text, setText] = useState('');
  const history = useHistory()
  const [{ reload, profile, totalcart, message }, dispatch] = useStateValue();
  const [menu, setMenu] = useState(false);
  // console.log(totalcart);

  useEffect(() => {

    const getmyCart = async () => {
      await Axios({
        url: `${domain}/api/mycart/`,
        method: 'GET',
        headers: header,
      }).then(response => {
        console.log("my cart", response.data['cartproducts'].length);
        let data = response.data['cartproducts'].length

        dispatch({
          type: 'CARTPROD',
          value: data
        })
      }).catch(_ => {
        dispatch({
          type: 'CARTPROD',
          value: 0
        })
      })
    }
    getmyCart()

  }, [reload])



  const logoutnow = () => {
    window.localStorage.clear()
    dispatch({
      type: 'PRO',
      value: null
    })
    dispatch({
      type: 'RE',
      value: 'logout sessus'
    })
    // history.push('/')
    window.location.href = '/';
  }

  const searchnow = () => {
    history.push(`/q-${text}`)
  }
  const mycart = () => {
    history.push('/mycart')
  }
  const goprofile = () => {
    history.push(`/u-${profile?.username}-${profile?.id}`)
  }

  return (
    <AppBar >
      <Toolbar>
        <Grid style={{ flexGrow: "1" }} container diraction="column">
          <Button onClick={() => { history.push('/') }} color="inherit">
            <Typography variant="h4">E-CWR</Typography>
          </Button>

          <Paper style={{ margin: "0 20px" }}>
            <InputBase
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Products Category and Brands..."
              style={{ padding: "10px" }}
            />
            <IconButton
              disabled={text.length <= 0 ? true : false}
              onClick={searchnow} type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        {
          profile === null ?
            <Button onClick={() => { history.push('/login') }} color="inherit">Login</Button>
            :
            <>
              <IconButton onClick={mycart} color="inherit">
                <Badge badgeContent={totalcart} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={() => setMenu(!menu)} style={{
                // position: 'relative'
              }} color="inherit">
                <AccountCircleRoundedIcon />
              </IconButton>
              {
                menu &&
                <ClickAwayListener onClickAway={() => setMenu(false)}>
                  <Card style={{
                    position: 'fixed'
                    ,
                    top: '40px',
                    right: '10px'
                  }}>
                    <MenuItem onClick={goprofile}>Profile</MenuItem>
                    <MenuItem onClick={logoutnow}>Logout</MenuItem>
                  </Card>
                </ClickAwayListener>
              }
            </>
        }

      </Toolbar>
      {
        message?.show &&
        <Alert variant="filled" severity="success">
          {message?.title}
        </Alert>
      }
    </AppBar>
  );
};

export default Navbar;
