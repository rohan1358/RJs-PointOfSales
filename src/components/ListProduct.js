import React, { Component } from "react";
import Axios from "axios";
// import API from './Api'
import Home from "./Home";
import "../assets/css/Styless.css";
import Cart from "./Cart";
import Filter from "./Filter";

import { confirmAlert } from "react-confirm-alert";
import { connect } from "react-redux";
import qs from "querystring";
import { Modal, Row, Col, Container } from "react-bootstrap";

class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setModalShow: false,
      product: [],
      cartItems: [],
      search: "",
      sort: "",
      isOpen: false,
      user: localStorage.getItem("user"),
      token: sessionStorage.getItem("token")
    };
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  getProduct = async () => {
    Axios.get("http://localhost:8012/api/v1/product", {
      header: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
      const product = res.data.result;
      this.setState({ product });
    });
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  };

  componentDidMount = () => {
    console.log(this.state.token);
    if (this.state.token === null) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/list");
    }
    this.getProduct();
    document.addEventListener("click", this._handleDocumentClick, false);
  };

  componentDidMount() {
    console.log(this.state.user);
  }
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
      "http://localhost:8012/api/v1/product/" + this.state.product.id
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

  postCheckout = () => {
    for (let i = 0; i < this.state.cartItems.length; i++) {
      const bodyFormData = qs.stringify({
        order_id: this.state.idOrder,
        product_id: this.state.carts[i].id,
        qty: this.state.carts[i].qty
      });
      Axios.post("http://localhost:8012/api/v1/order", bodyFormData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": localStorage.usertoken
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

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

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          if (cp.count === 1) {
            this.handleRemoveFromCart(e, product);
          } else {
            cp.count += -1;
          }
        }
        if (cp.count >= product.stock) {
          alert("cant reduce to cart");
          cp.count -= 1;
        }
      });
      // if (!productAlreadyInCart) {
      //   cartItems.push({ ...product, count: 1 });
      // }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };
  Checkout = () => {
    const date = new Date();
    const month = date.toDateString();
    const year = date.getFullYear();
    console.log(month);
    this.setState({ setModalShow: true });
    console.log("order");
    const invoices = new Date().toLocaleString().replace(/[/:, -,P,M,A]/gi, "");
    this.state.cartItems.forEach(state => {
      const form = {
        product_id: state.id,
        qty: state.count,
        invoices,
        total: state.count * state.price,
        dates: month,
        users: this.state.user,
        year: year
      };
      // console.log(state.id);
      Axios.post("http://localhost:8012/api/v1/order", qs.stringify(form))
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  cancelOrder = () => {
    this.setState({ cartItems: [] });
  };
  txt = () => {
    const { cartItems } = this.state;

    // console.log(cartItems);

    return (
      <>
        <Container
          style={{ backgroundColor: "white", marginTop: 0, paddingTop: 5 }}
        >
          {cartItems.map(item => (
            <Row key={item.id} style={{ marginBottom: 3 }}>
              <Col className="txt-onModel"> {item.name} </Col>
              <Col sm="3" className="txt-onModel">
                {" "}
                Rp.{item.price}
              </Col>
            </Row>
          ))}
          <Row style={{ marginTop: 20 }}>
            <Col
              style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}
            >
              Total :
            </Col>
            <Col className="txt-onModel" sm="3">
              Rp.
              {cartItems.reduce((a, c) => a + c.price * c.count, 0)}{" "}
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  MyVerticallyCenteredModal = props => {
    const invoices = new Date().toLocaleString().replace(/[/:, -,P,M,A]/gi, "");
    // console.log(this.dataProduct());
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <text> Checkout </text>
            <br />
            <text>cashier: {this.state.user} </text>
          </Modal.Title>
          <text style={{ fontSize: 20 }}>receipt no : {invoices} </text>
        </Modal.Header>
        <Modal.Body> {this.txt()} </Modal.Body>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              width: 500,
              height: 60,
              backgroundColor: "#F24f8a",
              borderRadius: 10,
              marginBottom: 10,
              border: "none",
              fontSize: 20,
              fontWeight: "bold",
              color: "white"
            }}
            onClick={() => this.setState({ setModalShow: false })}
          >
            <text>Print</text>
          </button>
          <p style={{ fontSize: 20, fontWeight: "bold" }}>Or</p>
          <button
            style={{
              width: 500,
              height: 60,
              backgroundColor: "#57CAD5",
              borderRadius: 10,
              marginBottom: 20,
              border: "none",
              fontSize: 20,
              fontWeight: "bold",
              color: "white"
            }}
            onClick={() => this.setState({ setModalShow: false })}
          >
            <text>Send Email</text>
          </button>
        </div>
      </Modal>
    );
  };
  logout = () => {
    sessionStorage.removeItem("token");
    this.props.history.push("/");
  };
  fork = () => {
    this.props.history.push("/list");
  };
  add = () => {
    this.props.history.push("/add");
    localStorage.setItem("token", this.state.token);
  };
  history = () => {
    this.props.history.push("/history");
  };
  render() {
    let links = (
      <div>
        <ul>
          <li>
            <button onClick={() => this.fork()} className="btn-icon">
              <img
                alt="fork"
                src={require("../assets/image/fork.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.add()} className="btn-icon">
              <img
                alt="add"
                src={require("../assets/image/add.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.history()} className="btn-icon">
              <img
                alt="history"
                src={require("../assets/image/clipboard.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.logout()} className="btn-icon">
              <img
                alt="logout"
                src={require("../assets/image/logout.png")}
                width="50"
              />
            </button>
          </li>
        </ul>
      </div>
    );
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

                <div className={menuStatus} id="menu">
                  <ul>{links}</ul>
                </div>
              </div>

              {renderData}
            </div>
            <div className="cart">
              <div className="nav-cart" style={{ marginTop: 20 }}>
                <p className="title-cart">Cart Items</p>
              </div>
              <this.MyVerticallyCenteredModal
                show={this.state.setModalShow}
                onHide={() => this.setState({ setModalShow: false })}
              />
              <Cart
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
                handleAddToCart={this.handleAddToCart}
                handleReduceToCart={this.handleReduceToCart}
                openModal={this.Checkout}
                verticalModal={this.MyVerticallyCenteredModal}
                cancelOrder={this.cancelOrder}
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
