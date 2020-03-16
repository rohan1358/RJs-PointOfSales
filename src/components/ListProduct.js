import React, { Component } from "react";
import Axios from "axios";
// import API from './Api'
import Home from "./Home";
// import Axios from 'axios';
// import {Link} from 'react-router-dom'
// import {ADD_TO_CART} from './CartAction'
// import {connect} from 'react-redux'
// import {addToCart} from './action/cartAction'
import "../assets/css/Styless.css";
import Cart from "./Cart";
import Filter from "./Filter";
// import Menu from './Menu'

import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import store from './store'
import { fetchProduct } from "../actions/productActio";

// const URL = "http://localhost:8080/api/v1/"

class MenuLinks extends Component {
  constructor(props) {
    super(props);
    // Any number of links can be added here
    this.state = {
      links: [
        {
          link: "/list",
          img: require("../assets/image/fork.png")
        },
        {
          link: "/add",
          img: require("../assets/image/add.png")
        },
        {
          link: "#",
          img: require("../assets/image/clipboard.png")
        },
        {
          link: "/",
          img: require("../assets/image/logout.png")
        }
      ]
    };
  }
  render() {
    let links = this.state.links.map((link, i) => (
      // eslint-disable-next-line react/jsx-no-target-blank
      <li ref={i + 1}>
        <i aria-hidden="true" className={`fa ${link.icon}`}></i>
        <Link to={link.link}>
          <img width="50" src={link.img} alt="o" />
        </Link>
      </li>
    ));

    return (
      <div className={this.props.menuStatus} id="menu">
        <ul>{links}</ul>
      </div>
    );
  }
}

class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list(){
      //     this.setState(state => {
      //         if(state.sort !== ''){
      //             state.product.sort((a,b)=> )
      //         }
      //     })
      // },
      product: [],
      cartItems: [],
      search: "",
      sort: "",
      isOpen: false
    };
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  getProduct = async () => {
    Axios.get("http://localhost:8080/api/v1/product", {
      header: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
      const product = res.data;
      this.setState({ product });
    });
    console.log(this.state.product);
    // await this.props.dispatch(fetchProduct());
    // console.log(this.props)
    // this.setState({
    //     product: this.props.count.userData
    // })
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  };

  componentDidMount = () => {
    if (localStorage.getItem("token") === "undefined") {
      this.props.history.push("/");
    } else if (localStorage.getItem("token") !== "undefined") {
      this.props.history.push("/list");
    }
    this.getProduct();
    document.addEventListener("click", this._handleDocumentClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener("click", this._handleDocumentClick, false);
  }

  componentWillMount() {
    this.getProduct();
  }

  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    }
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  deleteProduct() {
    Axios.delete(
      "http://localhost:8080/api/v1/product/" + this.state.product.id
    );

    window.location.reload();
  }
  deleteConfirm() {
    confirmAlert({
      title: "toko",
      message: `Are you sure you want to delete ${this.state.product.name}`,
      buttons: [
        {
          label: "oke",
          onClick: () => this.deleteProduct()
        },
        {
          label: "no",
          onClick: () => {}
        }
      ]
    });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  handleChangeSort = e => {
    this.setState({ sort: e.target.value });
    this.list();
  };
  list = () => {
    this.setState(state => {
      if (state.sort === "price") {
        state.product.sort((a, b) => (a.price > b.price ? 1 : -1));
      } else if (state.sort === "name") {
        state.product.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (state.sort === "id_categori") {
        state.product.sort((a, b) => (a.id_categori > b.id_categori ? 1 : -1));
      } else {
        state.product.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
    });
  };

  handleRemoveFromCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
          if (cp.count === product.stock) {
            alert("cant add to cart");
            cp.count -= 1;
          }
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };
  handleReduceToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += -1;
          productAlreadyInCart = true;
        }
        if (cp.count >= product.stock) {
          alert("cant add to cart");
          cp.count -= 1;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  render() {
    let filterProduct = this.state.product.filter(product => {
      return product.name.indexOf(this.state.search) !== -1;
    });
    const renderData = filterProduct.map(product => {
      return (
        <Home
          product={product}
          key={product.id}
          refresh={this.getProduct}
          handleAddToCart={this.handleAddToCart}
          handleReduceToCart={this.handleReduceToCart}
          componentWillMount={this.componentWillMount}
        />
      );
    });

    let menuStatus = this.state.isOpen ? "isopen" : "";
    return (
      // <Provider store={store}>
      <div className="body">
        <div>
          <div style={{ width: "100%", display: "inline-block" }}>
            <div className="list">
              <div ref="root">
                <div className="menubar">
                  <Filter handleChangeSort={this.handleChangeSort} />
                  <input
                    type="search"
                    placeholder="search"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                  />

                  <div className="hambclicker" onClick={this._menuToggle}></div>
                  <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="title">
                    <span>{this.props.title}</span>
                  </div>
                </div>

                <MenuLinks menuStatus={menuStatus} />
              </div>
              {renderData}
            </div>
            <div className="cart">
              <div className="nav-cart" style={{ marginTop: 20 }}>
                <p className="title-cart">Cart Items</p>
              </div>
              <Cart
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
                handleAddToCart={this.handleAddToCart}
                handleReduceToCart={this.handleReduceToCart}
              />
            </div>
          </div>
        </div>
      </div>
      // </Provider>
    );
  }
}

const mapStateToProps = ({ count }) => {
  return {
    count
  };
};
export default connect(mapStateToProps)(list);
