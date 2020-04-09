import React, { Component } from "react";
import Axios from "axios";
// import API from './Api'
import Home from "./Home";
import "../assets/css/Styless.css";
import Cart from "./Cart";
import Filter from "./Filter";
import { FaSmile } from "react-icons/fa";
import { connect } from "react-redux";
import qs from "querystring";
import { Modal, Row, Col, Container } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

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
      token: sessionStorage.getItem("token"),
      show: false,
    };
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }
  cartNotNull() {
    const { cartItems } = this.state;
    return (
      <>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          {cartItems.map((cart, i) => {
            return (
              <div key={cart.id} style={{ height: "120px", marginTop: 5 }}>
                <div key={i} style={{ float: "left", marginRight: 5 }}>
                  <img
                    style={{ width: "30vw" }}
                    src={cart.image.replace(
                      "localhost:8012",
                      "54.158.219.28:8011"
                    )}
                    alt={cart.name}
                  />
                </div>
                <p style={{ fontWeight: "bold" }}>{cart.name}</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                  }}
                >
                  <div>
                    <button
                      className="btnaddreduce"
                      onClick={(e) => this.handleReduceToCart(e, cart)}
                    >
                      -
                    </button>
                    <label>{cart.count}</label>
                    <button
                      className="btnaddreduce"
                      onClick={(e) => this.handleAddToCart(e, cart)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p style={{ float: "right" }}>Rp.{cart.price} </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <div>
              <p style={{ float: "left" }}>Total :</p>
              <p style={{ float: "right" }}>
                Rp.
                {cartItems.reduce((a, c) => a + c.price * c.count, 0)}*
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
          <button
            style={{
              backgroundColor: "#57CAD5",
              border: "none",
              color: "white",
              float: "right",
              marginRight: 20,
            }}
            onClick={() => this.Checkout()}
          >
            Checkout
          </button>
          <button
            style={{
              backgroundColor: "#F24F8A",
              border: "none",
              color: "white",
              float: "right",
              marginRight: 20,
            }}
            onClick={() => this.cancelOrder()}
          >
            Cancel
          </button>
        </div>
      </>
    );
  }
  cartNull() {
    return (
      <>
        <div>
          <div>
            <img
              src={require("../assets/image/restaurant.png")}
              alt="restaurant"
              style={{ width: "30%", marginLeft: "35%" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              You Cart Is Empty
            </p>
            <p style={{ marginTop: -10 }}>please add some items from menu</p>
          </div>
        </div>
      </>
    );
  }
  getProduct = async () => {
    Axios.get("http://54.158.219.28:8011/api/v1/product", {
      header: { "x-access-token": localStorage.getItem("token") },
    }).then((res) => {
      const product = res.data.result;
      this.setState({ product });
    });
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      });
    }
  };

  componentDidMount = () => {
    if (this.state.token === null) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/list");
    }
    this.getProduct();
    document.addEventListener("click", this._handleDocumentClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener("click", this._handleDocumentClick, false);
  }

  UNSAFE_componentWillMount() {
    this.getProduct();
  }

  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false,
      });
    }
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  postCheckout = () => {
    for (let i = 0; i < this.state.cartItems.length; i++) {
      const bodyFormData = qs.stringify({
        order_id: this.state.idOrder,
        product_id: this.state.carts[i].id,
        qty: this.state.carts[i].qty,
      });
      Axios.post("http://54.158.219.28:8012/api/v1/order", bodyFormData, {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": localStorage.usertoken,
        },
      });
    }
  };

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  handleChangeSort = (e) => {
    this.setState({ sort: e.target.value });
    this.list();
  };
  list = () => {
    this.setState((state) => {
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cartItems !== prevProps.cartItems) {
      this.setState(this.props.cartItems === []);
    }
  }
  handleRemoveFromCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((a) => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleAddToCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach((cp) => {
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
    this.setState((state) => {
      const cartItems = state.cartItems;

      cartItems.forEach((cp) => {
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
    this.setState({ setModalShow: true });
    const invoices = new Date().toLocaleString().replace(/[/:, -,P,M,A]/gi, "");
    this.state.cartItems.forEach((state) => {
      const form = {
        product_id: state.id,
        qty: state.count,
        invoices,
        total: state.count * state.price,
        dates: month,
        users: this.state.user,
        year: year,
      };
      Axios.post("http://54.158.219.28:8011/api/v1/order", qs.stringify(form));
    });
  };
  cancelOrder = () => {
    this.setState({ cartItems: [] });
  };
  txt = () => {
    const { cartItems } = this.state;

    return (
      <>
        <Container
          style={{ backgroundColor: "white", marginTop: 0, paddingTop: 5 }}
        >
          {cartItems.map((item) => (
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
  MyVerticallyCenteredModal = (props) => {
    const invoices = new Date().toLocaleString().replace(/[/:, -,P,M,A]/gi, "");
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <p> Checkout </p>
            <br />
            <p>cashier: {this.state.user} </p>
          </Modal.Title>
          <p style={{ fontSize: 20 }}>receipt no : {invoices} </p>
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
              color: "white",
            }}
            onClick={() => this.setState({ setModalShow: false })}
          >
            <label>Print</label>
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
              color: "white",
            }}
            onClick={() => this.setState({ setModalShow: false })}
          >
            <label>Send Email</label>
          </button>
        </div>
      </Modal>
    );
  };

  logoutComfirm = () => {
    const text = (
      <small style={{ fontSize: 25 }}>
        Hello World <FaSmile />{" "}
      </small>
    );
    confirmAlert({
      title: text,
      message: `Are you sure want to logout?`,
      buttons: [
        {
          label: "oke",
          onClick: () => this.logout(),
        },
        {
          label: "no",
          onClick: () => {},
        },
      ],
    });
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
  cartComp = (test) => {
    this.props.history.push("/cart", (test = this.state.cartItems));
  };
  modalCart(open) {
    this.setState({ show: open });
  }
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
            <button onClick={() => this.logoutComfirm()} className="btn-icon">
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
    let filterProduct = this.state.product.filter((product) => {
      return product.name.indexOf(this.state.search) !== -1;
    });
    const renderData = filterProduct.map((product) => {
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
    const { cartItems } = this.state;
    return (
      <div className="list-area">
        <div className="list">
          <div ref="root">
            <div className="menubar">
              <button
                onClick={() => this.modalCart(true)}
                className="btn-cart"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  float: "right",
                  marginTop: 15,
                }}
              >
                <img
                  width="30"
                  src={require("../assets/image/cart.png")}
                  alt="cart"
                />
              </button>

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
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cart Items</Modal.Title>
          </Modal.Header>
          {cartItems.length === 0 ? this.cartNull() : this.cartNotNull()}
        </Modal>
      </div>
      // </Provider>
    );
  }
}

const mapStateToProps = ({ count }) => {
  return {
    count,
  };
};
export default connect(mapStateToProps)(list);
