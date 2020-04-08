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
    <div
      className="rounded"
      style={{
        float: "left",
        marginRight: 10,
        margin: 10,
        border: 10,
        padding: 15,
      }}
    >
      <div>
        <div style={{ borderBottomWidth: 2, borderBottomColor: "blue" }}>
          <img
            className="img-list"
            style={{ width: 200, height: 150 }}
            src={product.image.replace("localhost:8012", "54.158.219.28:8011")}
            alt="img"
          />
          <br />
          <p style={{ fontSize: 20, marginTop: 0 }}>{product.name}</p>
          {/* <strong style={{ float: "right" }}>stock : {product.stock}</strong> */}
          <p style={{ marginTop: -20, fontWeight: "bold" }}>
            Rp.{product.price}
          </p>
        </div>
        <button className="btn" onClick={(e) => handleAddToCart(e, product)}>
          Add
        </button>
        <Link to={"/edit/" + product.id}>
          <button type="button" className="btn">
            Edit
          </button>
        </Link>
        &nbsp;
        <button type="button" className="btn" onClick={() => deleteConfirm()}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Home;
