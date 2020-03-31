import React, { Component } from "react";
// import  utils  from "./Utils";
import "../assets/css/Styless.css";
import { Button } from "react-bootstrap";
// import Axios from "axios";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      product: [
        {
          kawasaki: "200000000",
          yamaha: "300000000"
        },
        {
          kawasaki: "300000000",
          yamaha: "300000000"
        }
      ],
      cartItems: []
    };
  }
  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };
  onHide = () => {
    this.setState({
      modalIsOpen: this.state.modalIsOpen
    });
  };
  cartNull() {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          alt="img"
          width="300"
          src={require("../assets/image/restaurant.png")}
        ></img>
        <p className="cartnull">You Cart Is Empty</p>
        <p className="cartnulldsc">please add some items from menu</p>
        <br />
      </div>
    );
  }
  cart() {
    return (
      <div className="crt-itm">
        <div>
          <img
            src="smiley.gif"
            alt="Smiley face"
            style={{ float: "left", width: 42, height: 42, marginRight: 20 }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div className="cart-list">
          {cartItems.length === 0
            ? this.cartNull()
            : cartItems.length > 0 && (
                <div className="crt-itm">
                  {cartItems.map(item => (
                    <div key={item.id}>
                      <img
                        alt="img"
                        src={item.image.replace(
                          "localhost:8012",
                          "54.158.219.28:8011"
                        )}
                        style={{
                          float: "left",
                          width: 100,
                          height: 95,
                          marginRight: 20
                        }}
                      />
                      <div>
                        <div>
                          <p style={{fontSize:18, fontWeight:"bold"}}>{item.name}</p>
                        </div>

                        <br />
                        <div style={{ float: "right" }}>
                          Rp.
                          {item.price}
                        </div>
                        <div>
                          <Button
                            style={{
                              backgroundColor: "rgba(130, 222, 58, 0.2)",
                              color: "#82DE3A",
                              border: "none",
                              marginRight: 5
                            }}
                            className="btn"
                            onClick={e =>
                              this.props.handleReduceToCart(e, item)
                            }
                          >
                            -
                          </Button>
                          <label className="count" style={{ fontSize: 20 }}>
                            {item.count}
                          </label>
                          <Button
                            style={{
                              backgroundColor: "rgba(130, 222, 58, 0.2)",
                              color: "#82DE3A",
                              border: "none",
                              marginLeft: 5
                            }}
                            className="btn"
                            onClick={e => this.props.handleAddToCart(e, item)}
                          >
                            +
                          </Button>
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="fixed">
                    <div>
                      <ul style={{ listStyleType: "none", fontSize: 25 }}>
                        <li style={{ float: "right", marginRight: 5 }}>
                          Rp.
                          {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                          *
                        </li>
                        <li>Total :</li>
                      </ul>
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <label>*Belum termasuk ppn</label>
                    </div>
                    <button
                      className="btncc"
                      style={{ backgroundColor: "#57CAD5" }}
                      onClick={() => this.props.openModal()}
                    >
                      checkout
                    </button>

                    <br />
                    <button
                      className="btncc"
                      style={{ backgroundColor: "#F24F8A" }}
                      onClick={() => this.props.cancelOrder()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
        </div>
      </>
    );
  }
}