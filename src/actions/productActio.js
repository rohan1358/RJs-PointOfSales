import {GET_PRODUCT} from './type'
import Axios from 'axios'

const URL = "http://localhost:8080/api/v1/product"

export const fetchProduct = () => {
    return {
      type: GET_PRODUCT, // string yang mendiskripsikan perintah
      payload: Axios.get(URL, {header:{'x-access-token': localStorage.getItem('token')}})
    //   .then(res => {
    //       const product = res.data.result
    //       this.setState({product})
    //   })
    };
  };
