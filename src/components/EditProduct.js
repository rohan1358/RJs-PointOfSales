import React, { Component } from 'react';
import Axios from 'axios';

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeIdCategory = this.onChangeIdCategory.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            name:'',
            image: null,
            price: '',
            id_categori: '',
            stock: ''
        }
    }
    
        // eslint-disable-next-line react/no-direct-mutation-state
        
        componentDidMount= () =>{
            const id = this.props.match.params.id;
            Axios.get(`http://localhost:8080/api/v1/product/`+ id)
            .then(res => {
                console.log(res)
                this.setState({
                    name:res.data[0].name,
                    image:res.data.image,
                    price:res.data[0].price,
                    id_categori:res.data[0].id_categori,
                    stock:res.data[0].stock,

                })
            })
            .catch(function ( error ){
                console.log(error)
            })
        }

        // eslint-disable-next-line no-undef
        onChangeName=(e) => {
            this.setState({
                name: e.target.value
            });
        }
        
   
        // eslint-disable-next-line no-undef
        onChangeImage = (e) => {
            this.setState({
                image: e.target.files[0]
            })
        }

        // eslint-disable-next-line no-undef
        onChangePrice=(e)=>{
            this.setState({
                price : e.target.value
            });
        }

        // eslint-disable-next-line no-undef
        onChangeIdCategory=(e)=>{
            this.setState({
                id_categori : e.target.value
            });
        }

        // eslint-disable-next-line no-undef
        onChangeStock=(e)=>{
            this.setState({
                stock : e.target.value
            });
        }
   
        // eslint-disable-next-line no-undef
        handlerSubmit=()=>{
            // eslint-disable-next-line no-restricted-globals
            event.preventDefault();
        
           let formData = new FormData();
           formData.append("name", this.state.name);
           formData.append("price", this.state.price);
           formData.append("id_categori", this.state.id_categori);
           formData.append("stock", this.state.stock);
           formData.append("image", this.state.image);

        //    const objk = {
        //        name : this.state.name,
        //        image : this.state.image,
        //        price : this.state.price,
        //        id_categori : this.state.id_categori,
        //        stock : this.state.stock
        //    }
   
           Axios.patch('http://localhost:8080/api/v1/product/'+ this.props.match.params.id, formData, {headers: { 'content-type': 'multipart/form-data' }})
           .then(response => {
               if(this.state.name === '' || this.state.price === '' || this.state.image === ''){
                   alert('tidak boleh ada yang dikosongkan')
               }
               else {
                this.props.history.push('/list')
               }
           })
           .catch(error => {
               console.log(error);
           }
           ); 
   
       }
       render() {
        return ( 
            <div style={{marginTop: 100}} className="container">
                {/* <form>
                    <label>Name Product</label>
                    <input className="form-control form-control-sm" name="name" onChange={this.handlerChange} type="text" placeholder=".form-control-sm"></input>
                    <label>image</label><br/>
                    <input  type="file"  className="custom" name="image" onChange={this.handlerChange} placeholder=".form-control-sm"></input><br/>
                    <label>Price</label>
                    <input className="form-control form-control-sm" name="price" onChange={this.handlerChange} type="text" placeholder=".form-control-sm"></input>
                    <label>category</label>
                    <select className="form-control form-control-sm" onChange={this.handlerChange}>
                        <option name="id_categori" value="1">1</option>
                        <option name="id_categori" value="2">2</option>
                    </select>
                    <label>stock</label>
                    <input className="form-control form-control-sm" name="stock" onChange={this.handlerChange} type="text" placeholder=".form-control-sm"></input><br/>
                    <input type="submit" value="edit" className="btn btn-success">Edit</input>
                </form> */}
                <form onSubmit={this.handlerSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>name product</td>
                            <td><input type="text" name="name" onChange={this.onChangeName} defaultValue={this.state.name}/></td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td><input type="file" name="image" onChange={this.onChangeImage} defaultValue={this.state.image}/></td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td><input type="text" name="price" onChange={this.onChangePrice}  defaultValue={this.state.price}/></td>
                        </tr>
                        <tr>
                            <td>category</td>
                            <td>
                                <select name="id_categori" onChange={this.onChangeIdCategory}  defaultValue={this.state.id_category}>
                                    <option value="1" selected >makanan</option>
                                    <option value="2">kendaraan</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>stock</td>
                            <td><input type="text" name="stock" onChange={this.onChangeStock}  value={this.state.stock}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" className="btn btn-primary"/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
         );
    }
}
 
export default EditProduct;