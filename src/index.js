import React from 'react'
import ReactDom from 'react-dom'
// import React from "react";
import ListProduct from "../src/components/ListProduct";
import AddProduct from "../src/components/AddProduct";
import EditProduct from "../src/components/EditProduct"
import Login from "../src/components/Login"
// import Logout from "./Logout"
import {Provider} from 'react-redux'
import store from '../src/components/store'

import { BrowserRouter, Route } from "react-router-dom";


// import AppWithRedux from './components/App.js'

const AppWithRouter = () => (
    <BrowserRouter>
       <Route exact path="/" component={Login}/>
       <Route exact path="/list" component={ListProduct} />
       <Route exact path="/add" component={AddProduct} />
       <Route path="/edit/:id" component={EditProduct} />
     </BrowserRouter>
   );
   const AppWithRedux = () => (
     <Provider store={store}>
       <AppWithRouter />
     </Provider>
   );

ReactDom.render(<AppWithRedux/>, document.getElementById("root"))