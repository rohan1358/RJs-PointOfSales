import React, {Component} from 'react'
import '../assets/css/Styless.css'

class Filter extends Component {
    render() { 
        return ( 
            <div className="filter">
                <select value={this.props.sort} onChange={this.props.handleChangeSort}>
                    <option>Select</option>
                    <option value="price">price</option>
                    <option value="name">name</option>
                    <option value="id_categori">category</option>
                </select>
            </div>
         );
    }
}
 
export default Filter;