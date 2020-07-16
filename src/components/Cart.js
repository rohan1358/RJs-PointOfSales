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
      cartItems: [],
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cartItems !== prevProps.cartItems) {
      this.setState(this.props.cartItems);
    }
  }
  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };
  onHide = () => {
    this.setState({
      modalIsOpen: this.state.modalIsOpen,
    });
  };
  cartNull() {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          alt="img"
          width="40%"
          src={require("../assets/image/restaurant.png")}
        ></img>
        <p className="cartnull">You Cart Is Empty</p>
        <p className="cartnulldsc">please add some items from menu</p>
        <br />
      </div>
    );
  }
  cartNotNull() {
    const { cartItems } = this.props;
    return (
      <div style={{ backgroundColor: "yellow" }} className="crt-itm">
        {cartItems.map((item) => (
          <div key={item.id}>
            <img
              alt="img"
              src={item.image.replace("localhost:8012", "54.157.181.233:8012")}
              style={{
                float: "left",
                width: 100,
                height: 95,
                marginRight: 20,
              }}
            />
            <div>
              <div>
                <p style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</p>
              </div>

              <br />
              <div style={{ float: "right" }}>
                Rp.
                {item.price}
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          style={{
                            backgroundColor: "rgba(130, 222, 58, 0.2)",
                            color: "#82DE3A",
                            border: "none",
                            marginRight: 5,
                          }}
                          className="btn"
                          onClick={(e) =>
                            this.props.handleReduceToCart(e, item)
                          }
                        >
                          -
                        </Button>
                      </td>
                      <td>
                        <label className="count" style={{ fontSize: 20 }}>
                          {item.count}
                        </label>
                      </td>
                      <td>
                        <Button
                          style={{
                            backgroundColor: "rgba(130, 222, 58, 0.2)",
                            color: "#82DE3A",
                            border: "none",
                            marginLeft: 5,
                          }}
                          className="btn"
                          onClick={(e) => this.props.handleAddToCart(e, item)}
                        >
                          +
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <br />
                <br />
              </div>
            </div>
          </div>
        ))}
        <div>
          <div>
            <ul style={{ listStyleType: "none", fontSize: 25 }}>
              <li>Total :</li>
              <li style={{ float: "right", marginRight: 5 }}>
                Rp.
                {cartItems.reduce((a, c) => a + c.price * c.count, 0)}*
              </li>
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
          {cartItems.length === 0 ? this.cartNull() : this.cartNotNull()}
        </div>
      </>
    );
  }
}
