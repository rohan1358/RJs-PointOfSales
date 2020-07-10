import React, { Component } from "react";
import Axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";
import "../assets/css/Styless.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      id_categori: "",
      stock: "",
      image: null,
      token: sessionStorage.getItem("token"),
      isloading: false,
    };
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  handleChangeImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handlerSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("id_categori", this.state.id_categori);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.image);
    await Axios.post("http://54.158.219.28:8011/api/v1/product/", formData, {
      headers: { "content-type": "multipart/form-data" },
    })
      .then(
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000)
      )
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    if (this.state.token === null) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.handlerSubmit}>
          <div className="title-add">
            <label>Add Item</label>
          </div>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="name"
                type="text"
                onChange={this.handlerChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="image"
                onChange={this.handleChangeImage}
                type="file"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="price"
                type="text"
                onChange={this.handlerChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              stock
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="stock"
                type="number"
                onChange={this.handlerChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="id_categori"
              onChange={this.handlerChange}
            >
              <option>Select</option>
              <option name="id_categori" value="1">
                makanan
              </option>
              <option name="id_categori" value="2">
                minuman
              </option>
              <option name="id_categori" value="3">
                kendaraan
              </option>
              <option name="id_categori" value="4">
                aksesoris kendaraan
              </option>
            </Form.Control>
          </Form.Group>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => this.props.history.push("/list")}
              className="btn-add"
              style={{
                backgroundColor: "#F24F8A",
                borderRadius: 10,
                border: "none",
              }}
            >
              Cancel
            </Button>
            <input
              type="submit"
              style={{
                border: "none",
                height: 36,
                width: 100,
                borderRadius: 10,
                backgroundColor: "#57CAD5",
              }}
            ></input>
          </div>
        </Form>
      </div>
      // </div>
    );
  }
}

export default AddProduct;
