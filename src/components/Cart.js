import React, { Component } from "react";
// import  utils  from "./Utils";
import '../assets/css/Styless.css'

export default class Cart extends Component{
    render(){
        const {cartItems} = this.props
        return(
            <div className="cart-list">
                
                {cartItems.length === 0
                ? "Basket is empty " :
                <div>You have {cartItems.length}
                items in the product. <hr/> </div>}
                {cartItems.length> 0 &&
                <div>
                    <ul style={{marginLeft: -25, color:"blue"}}>
                        {cartItems.map(item => (
                            <li key = {item.id}>
                                <b>{item.name}</b>
                                <button style={{float: "right"}} onClick={(e) => this.props.handleRemoveFromCart(e, item)}>delete</button><br/>
                                {/* {item.price}x{item.count} */}
                                <button onClick={(e)=>this.props.handleReduceToCart(e, item)}>Reduce</button>
                                {item.count}
                                <button onClick={(e)=>this.props.handleAddToCart(e, item)}>Add</button>
                            </li>
                        ))}
                    </ul>
                    <b>Sum : Rp.{cartItems.reduce((a, c) => a + c.price * c.count, 0)}</b><br/>
                    <button onClick={() => alert('Todo: Implement checkout page.')} >checkout</button>
            </div>
    }
    </div> 
    )
    }
}