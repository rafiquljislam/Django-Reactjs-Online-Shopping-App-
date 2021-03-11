import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import AuthPage from "./page/AuthPage";
import ProductDetails from "./page/ProductDetails";
import SearchResult from "./page/SearchResult";
import SingleBrandProducts from "./page/SingleBrandProducts";
import SingleCategoryProducts from './page/SingleCategoryProducts'
import { useStateValue } from "./state/stateProvider";
import Axios from "axios";
import { domain, header } from "./env";
import CustomerProfile from "./page/CustomerProfile";
import MyCart from "./page/MyCart";
import OldOrder from "./page/OldOrder";
import OrderNow from "./page/OrderNow";
import OldCartProducts from "./components/cart/OldCartProducts";

const App = () => {
  const [{ profile, reload }, dispatch] = useStateValue();
  useEffect(() => {
    const getProfile = async () => {
      await Axios({
        url: `${domain}/api/customer/`,
        headers: header,
      })
        .then((response) => {
          // console.log(response.data);
          dispatch({
            type: "PRO",
            value: response.data,
          });
        })
        .catch((e) => {
          dispatch({
            type: "PROFILE",
            value: null,
          });
          console.log(e, "$$$ERROR$$$$$$$$$$$$$$$$$$$$$$$");
        });
    };
    getProfile();
  }, [reload]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/q-:query" component={SearchResult} />
        <Route exact path="/category-:cat-:id" component={SingleCategoryProducts} />
        <Route exact path="/brand-:title-:id" component={SingleBrandProducts} />
        <Route exact path="/product-:title-:id" component={ProductDetails} />
        <Route exact path='/login' component={AuthPage} />
        {
          profile !== null &&
          <>
            <Route exact path='/u-:username' component={CustomerProfile} />
            <Route exact path='/mycart' component={MyCart} />
            <Route exact path='/oldorder' component={OldOrder} />
            <Route exact path='/order-:cartid' component={OrderNow} />
            <Route exact path='/oldorderdetails-:id' component={OldCartProducts} />
          </>
        }
        <Route component={AuthPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
