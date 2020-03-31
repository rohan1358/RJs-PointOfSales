import React, { Component } from "react";
import Axios from "axios";
import { Form, Col, Row, Button } from "react-bootstrap";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeIdCategory = this.onChangeIdCategory.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      image: null,
      price: "",
      id_categori: "",
      stock: ""
    };
  }

  // eslint-disable-next-line react/no-direct-mutation-state

  componentDidMount = () => {
    if (sessionStorage.getItem("token") === null) {
      this.props.history.push("/");
    }
    const id = this.props.match.params.id;
    Axios.get(`http://54.158.219.28:8011/api/v1/product/` + id)
      .then(res => {
        this.setState({
          name: res.data[0].name,
          image: res.data.image,
          price: res.data[0].price,
          id_categori: res.data[0].id_categori,
          stock: res.data[0].stock
        });
      })
  };

  // eslint-disable-next-line no-undef
  onChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  // eslint-disable-next-line no-undef
  onChangeImage = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  // eslint-disable-next-line no-undef
  onChangePrice = e => {
    this.setState({
      price: e.target.value
    });
  };

  // eslint-disable-next-line no-undef
  onChangeIdCategory = e => {
    this.setState({
      id_categori: e.target.value
    });
  };

  // eslint-disable-next-line no-undef
  onChangeStock = e => {
    this.setState({
      stock: e.target.value
    });
  };

  // eslint-disable-next-line no-undef
  handlerSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("id_categori", this.state.id_categori);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.image);

    Axios.patch(
      "http://54.158.219.28:8011/api/v1/product/" + this.props.match.params.id,
      formData,
      { headers: { "content-type": "multipart/form-data" } }
    )
      .then(response => {
        if (
          this.state.name === "" ||
          this.state.price === "" ||
          this.state.image === ""
        ) {
          alert("tidak boleh ada yang dikosongkan");
        } else {
          this.props.history.push("/list");
        }
      })
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
                onChange={this.onChangeName}
                defaultValue={this.state.name}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Image
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="image"
                type="file"
                onChange={this.onChangeImage}
                defaultValue={this.state.image}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="price"
                type="text"
                onChange={this.onChangePrice}
                defaultValue={this.state.price}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Stock
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="stock"
                type="text"
                onChange={this.onChangeStock}
                defaultValue={this.state.stock}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="id_categori"
              onChange={this.onChangeIdCategory}
              defaultValue={this.state.id_category}
            >
              <option>Select</option>
              <option value="1">makanan</option>
              <option value="2">minuman</option>
              <option value="3">kendaraan</option>
              <option value="4">aksesoris kendaraan</option>
            </Form.Control>
          </Form.Group>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => this.props.history.push("/list")}
              className="btn-add"
              style={{
                backgroundColor: "#F24F8A",
                borderRadius: 10,
                border: "none"
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
                backgroundColor: "#57CAD5"
              }}
            ></input>
          </div>
        </Form>
      </div>
    );
  }
}

export default EditProduct;
