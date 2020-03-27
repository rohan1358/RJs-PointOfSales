import React, { Component } from "react";
import Axios from "axios";
// import API from './Api'
// import Axios from 'axios';
// import {Link} from 'react-router-dom'
// import {ADD_TO_CART} from './CartAction'
// import {connect} from 'react-redux'
// import {addToCart} from './action/cartAction'
import "../assets/css/Styless.css";
// import Menu from './Menu'

import { connect } from "react-redux";
import { Table } from "react-bootstrap";
// import store from './store'
// import { fetchProduct } from "../actions/productActio";

// const URL = "http://localhost:8080/api/v1/"

class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list(){
      //     this.setState(state => {
      //         if(state.sort !== ''){
      //             state.product.sort((a,b)=> )
      //         }
      //     })
      // },
      product: [],
      cartItems: [],
      sort: "",
      isOpen: false,
      history: [],
      todayIncome: [],
      yearIncome: [],
      allOrder: [],
      token: sessionStorage.getItem("token")
    };
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }

  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    }
  }
  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear("token");
    // this.props.history.push("/");
  };
  UNSAFE_componentWillMount() {
    this.bodoamat();
  }
  //
  todayIncome() {}
  bodoamat() {
    return (
      <>
        <div className="cart-history">
          <div className="grid-item grid1">
            <p style={{ fontWeight: "bold" }}>today's income</p>
            <>
              {this.state.todayIncome.map(map => {
                return (
                  <>
                    <p
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: -15
                      }}
                    >
                      {" "}
                      Rp.
                      {map.Total}{" "}
                    </p>
                  </>
                );
              })}
            </>
            <p style={{ marginTop: -20, fontWeight: "bold" }}>+2% Yesterday</p>
          </div>
          <div className="grid-item grid2">
            <p style={{ fontWeight: "bold" }}>Orders</p>
            <>
              {this.state.allOrder.map(map => {
                return (
                  <>
                    <p
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: -15
                      }}
                    >
                      {map.total_order}
                    </p>
                  </>
                );
              })}
            </>
            <p style={{ marginTop: -20, fontWeight: "bold" }}>+2% Yesterday</p>
          </div>
          <div className="grid-item grid3">
            <p style={{ fontWeight: "bold" }}>today's income</p>
            <>
              {this.state.yearIncome.map(map => {
                return (
                  <>
                    <p
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginTop: -15
                      }}
                    >
                      {" "}
                      Rp.
                      {map.total}{" "}
                    </p>
                  </>
                );
              })}
            </>
            <p style={{ marginTop: -20, fontWeight: "bold" }}>+2% Yesterday</p>
          </div>
        </div>
      </>
    );
  }
  listHistory = async () => {
    Axios.get("http://localhost:8012/api/v1/order").then(res => {
      const respon = res;
      const story = Object.values(respon);
      console.log({ story });
    });
  };
  componentDidMount() {
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token") === null) {
      this.props.history.push("/");
    } else if (sessionStorage.getItem("token") === "undefined") {
      this.props.history.push("/");
    }
    Axios.get("http://localhost:8012/api/v1/order").then(res => {
      const history = res.data;
      // const history = JSON.parse(story);
      // console.log(story)
      this.setState({ history });
      // console.log(this.state.history);
    });
    Axios.get("http://localhost:8012/api/v1/order/todayIncome").then(res => {
      const todayIncome = res.data;
      console.log(todayIncome);
      this.setState({ todayIncome });
    });
    Axios.get("http://localhost:8012/api/v1/order/yearincome").then(res => {
      const yearIncome = res.data;
      console.log(yearIncome);
      this.setState({ yearIncome });
    });
    Axios.get("http://localhost:8012/api/v1/order/allorder").then(res => {
      const allOrder = res.data;
      console.log(allOrder);
      this.setState({ allOrder });
    });
  }

  tblHistory() {
    // return this.state.history.map(hello => {
    //   console.log(hello);
    //   return (
    //     <>
    //       <text> {hello.invoices} </text>
    //     </>
    //   );
    // });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>invoices</th>
              <th>cashier</th>
              <th>date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.history.map(hello => {
              return (
                <>
                  <tr>
                    <td> #{hello.invoices} </td>
                    <td> {hello.users} </td>
                    <td> {hello.dates} </td>
                    <td> Rp.{hello.total} </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  logout = () => {
    sessionStorage.clear("token");
    this.props.history.push("/");
    // localStorage.clear("token");
    // console.log("hello");
  };
  fork = () => {
    this.props.history.push("/list");
  };
  add = () => {
    this.props.history.push("/add");
    localStorage.setItem("token", this.state.token);
  };
  history = () => {
    this.props.history.push("/history");
    localStorage.setItem("token", this.state.token);
  };
  render() {
    let links = (
      <div>
        <ul>
          <li>
            <button onClick={() => this.fork()} className="btn-icon">
              <img
                alt="fork"
                src={require("../assets/image/fork.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.add()} className="btn-icon">
              <img
                alt="add"
                src={require("../assets/image/add.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.history()} className="btn-icon">
              <img
                alt="history"
                src={require("../assets/image/clipboard.png")}
                width="50"
              />
            </button>
          </li>
          <li>
            <button onClick={() => this.logout()} className="btn-icon">
              <img
                alt="logout"
                src={require("../assets/image/logout.png")}
                width="50"
              />
            </button>
          </li>
        </ul>
      </div>
    );
    let menuStatus = this.state.isOpen ? "isopen" : "";

    return (
      <div className="body">
        <div style={{ width: "100%", display: "inline-block" }}>
          <div className="list-history">
            <div ref="root">
              <div className="menubar">
                <div>
                  <label className="lbl-hstry">History</label>
                </div>
                <div className="hambclicker" onClick={this._menuToggle}></div>
                <div id="hambmenu" className={menuStatus}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="title">
                  <span>{this.props.title}</span>
                </div>
              </div>

              <div className={menuStatus} id="menu">
                <ul>{links}</ul>
              </div>
            </div>
          </div>
          <div>{this.bodoamat()}</div>
          <div style={{ marginRight: 50, marginLeft: 50, marginTop: 20 }}>
            {this.tblHistory()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ count }) => {
  return {
    count
  };
};
export default connect(mapStateToProps)(list);
