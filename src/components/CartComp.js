import React, { Component } from "react";

export default class CartComp extends Component {
  render() {
    console.log(this.props.cartItems);
    return <div>
      <p>Hello</p>
    </div>;
  }
}
