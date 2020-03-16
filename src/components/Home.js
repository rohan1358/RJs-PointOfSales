import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../assets/css/Styless.css";
// import {connect} from 'react-redux'

// handleClick = (id)=>{
//     this.props.addToCart(id);
// }

import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

function Home({ product, refresh, handleAddToCart }) {
  function deleteProduct() {
    Axios.delete("http://localhost:8080/api/v1/product/" + product.id);

    return refresh();
  }

  function deleteConfirm() {
    confirmAlert({
      title: "toko",
      message: `Are you sure you want to delete ${product.name}`,
      buttons: [
        {
          label: "oke",
          onClick: () => deleteProduct()
        },
        {
          label: "no",
          onClick: () => {}
        }
      ]
    });
  }
  return (
    <div
      className="rounded"
      style={{
        float: "left",
        marginRight: 20,
        margin: 20,
        border: 10,
        backgroundColor: "lightblue",
        padding: 15
      }}
    >
      <div>
        <img
          className="img-list"
          style={{ width: 200, height: 150 }}
          src={product.image}
          alt=""
        />
        <br />
        <p style={{ fontSize: 20, fontWeight: "bold" }}>{product.name}</p>
        <strong style={{ float: "right" }}>stock : {product.stock}</strong>
        <small>Rp.{product.price}</small>
        <br />
        <button onClick={e => handleAddToCart(e, product)}>Add</button>
        <Link to={("/edit/" + product.id)}>
          <button type="button" className="btn btn-primary">
            Edit
          </button>
        </Link>
        &nbsp;
        <button type="button" onClick={deleteConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
}

// const mapStateToProps = (state)=>{
//     return {
//       items: state.items
//     }
//   }
// const mapDispatchToProps= (dispatch)=>{

//     return{
//         addToCart: (id)=>{dispatch(addToCart(id))}
//     }
// }

export default Home;
