import React from "react";
import ReactDom from "react-dom";
// import React from "react";
import ListProduct from "../src/components/ListProduct";
import AddProduct from "../src/components/AddProduct";
import EditProduct from "../src/components/EditProduct";
import Login from "../src/components/Login";
// import Logout from "./Logout"
import { Provider } from "react-redux";
import store from "../src/components/store";
import "bootstrap/dist/css/bootstrap.min.css";
import History from "../src/components/History";
import Register from '../src/components/Register'
import CartComp from './components/CartComp'
import '../src/assets/css/Styless.css'
import { BrowserRouter, Route } from "react-router-dom";

// import AppWithRedux from './components/App.js'

const AppWithRouter = () => (
  <BrowserRouter>
    <Route exact path="/" component={Login} />
    <Route exact path="/list" component={ListProduct} />
    <Route exact path="/add" component={AddProduct} />
    <Route path="/edit/:id" component={EditProduct} />
    <Route exact path="/history" component={History} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/cart" component={CartComp} />
  </BrowserRouter>
);
const AppWithRedux = () => (
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
);

ReactDom.render(<AppWithRedux />, document.getElementById("root"));
