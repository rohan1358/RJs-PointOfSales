import React, { Component } from "react";
import Axios from 'axios'

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      id_categori: "",
      stock: "",
      image: null
    };
  }

  handlerChange = e => {
    console.log(this.state.image);
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  //   componentDidMount=()=>{
  //       console.log(this.state.image)
  //   }

  handleChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handlerSubmit = () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("id_categori", this.state.id_categori);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.image);
    // console
    //   .log(this.state.image)

    //  const config = {
    //     headers: { 'content-type': 'multipart/form-data' }
    // }

    Axios.post("http://localhost:8080/api/v1/product/", formData, {
      headers: { "content-type": "multipart/form-data" }
    })
      .then(response => {
        console.log(response);
        if (this.state.name === "") {
          alert("jangan ada yang dikosongkan");
        } else {
          this.props.history.push("/list");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
        // <div className="container" style={{ marginTop: 70 }}>
        //   <form onSubmit={this.handlerSubmit}>
        //     <table>
        //       <tbody>
        //         <tr>
        //           <td>name product</td>
        //           <td>:</td>
        //           <td>
        //             <input
        //               type="text"
        //               style={{ height: 30 }}
        //               className="form-control"
        //               name="name"
        //               onChange={this.handlerChange}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td>price</td>
        //           <td>:</td>
        //           <td>
        //             <input
        //               type="text"
        //               style={{ height: 30 }}
        //               name="price"
        //               className="form-control"
        //               onChange={this.handlerChange}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td>category</td>
        //           <td>:</td>
        //           <td>
        //             <select
        //               className="custom-select"
        //               name="id_categori"
        //               style={{ height: 30 }}
        //               onChange={this.handlerChange}
        //             >
        //               <option>Pilih kategory</option>
        //               <option name="id_categori" value="1">
        //                 minuman
        //               </option>
        //               <option name="id_categori" value="2">
        //                 makanan
        //               </option>
        //             </select>
        //           </td>
        //         </tr>
        //         <tr>
        //           <td>stock</td>
        //           <td>:</td>
        //           <td>
        //             <input
        //               type="text"
        //               style={{ height: 30 }}
        //               name="stock"
        //               className="form-control"
        //               onChange={this.handlerChange}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td>Image</td>
        //           <td>:</td>
        //           <td>
        //             <input
        //               type="file"
        //               style={{ height: 30 }}
        //               name="image"
        //               onChange={this.handleChangeImage}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td></td>
        //           <td></td>
        //           <td>
        //             <input type="submit" className="btn btn-primary" />
        //           </td>
        //         </tr>
        //       </tbody>
        //     </table>
        //   </form>
        //   </div>
      <div className="form-style-3">
        <form className="form-add" onSubmit={this.handlerSubmit}>
          <fieldset>
            <legend>Add Product</legend>

            <label>
              <span>Name Product</span>
              <input
                name="name"
                onChange={this.handlerChange}
                type="text"
                className="inpput-field"
              ></input>
            </label>
            <label>
              <span>Price</span>
              <input
                name="price"
                onChange={this.handlerChange}
                type="text"
                className="inpput-field"
              ></input>
            </label>
            <label>
              <span>category</span>
              <select
                name="id_categori"
                style={{ width: 267 }}
                onChange={this.handlerChange}
              >
                <option>Pilih kategory</option>
                <option name="id_categori" value="1">
                  minuman
                </option>
                <option name="id_categori" value="2">
                  makanan
                </option>
              </select>
            </label>
            <label>
              <span>Stock</span>
              <input
                name="stock"
                onChange={this.handlerChange}
                type="text"
                className="inpput-field"
              ></input>
            </label>
            <label>
              <span>Image</span>
              <input
                name="image"
                style={{ width: 267 }}
                type="file"
                className="inpput-field"
                onChange={this.handleChangeImage}
              ></input>
            </label>
            <label style={{ textAlign: "right", marginRight: 20 }}>
              <span></span>
              <input type="submit" value="Add"></input>
            </label>
          </fieldset>
        </form>
      </div>
        // </div>
    );
  }
}

export default AddProduct;
