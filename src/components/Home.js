import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../assets/css/Styless.css";
import { FaSmile } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";

function Home({ product, refresh, handleAddToCart, deleteConfirm }) {
  async function deleteProduct() {
    await Axios.delete(
      "http://54.158.219.28:8011/api/v1/product/" + product.id
    );

    return refresh();
  }
  const text = (
    <small style={{ fontSize: 25 }}>
      Hello World <FaSmile />{" "}
    </small>
  );
  deleteConfirm = () => {
    confirmAlert({
      title: text,
      message: `Are you sure you want to delete ${product.name}?`,
      buttons: [
        {
          label: "oke",
          onClick: () => deleteProduct(),
        },
        {
          label: "no",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <div className="rounded">
      <div
        className="shadow-cart"
      >
        <div>
          <div className="img-area">
            <img
              className="img-list"
              src={product.image.replace(
                "localhost:8012",
                "54.158.219.28:8011"
              )}
              alt="img"
            />
            <br />
            <p className="txt-nameProduct">{product.name}</p>
            {/* <strong style={{ float: "right" }}>stock : {product.stock}</strong> */}
            <p className="txt-price">Rp.{product.price}</p>
          </div>
        </div>
        <button
          className="btn btn-list"
          onClick={(e) => handleAddToCart(e, product)}
        >
          Add
        </button>
        &nbsp;
        <Link to={"/edit/" + product.id}>
          <button className="btn btn-list">Edit</button>
        </Link>
        &nbsp;
        <button
          className="btn btn-list "
          style={{ backgroundColor: "#ff1f1f", color: "white" }}
          onClick={() => deleteConfirm()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Home;
