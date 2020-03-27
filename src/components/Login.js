import React, { Component } from "react";
import axios from "axios";
import "../assets/css/Styless.css";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      name: "",
      password: "",
      loggedIn,
      errMsg: ""
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    localStorage.clear("token");
    if (sessionStorage.getItem("token") !== null) {
      this.props.history.push("/list");
    }
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  inputChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  onSubmitForm = e => {
    console.log(sessionStorage.getItem("token"));
    e.preventDefault();

    axios
      .post("http://localhost:8012/api/v1/user/login", this.state)
      .then(response => {
        this.setState({
          loggedIn: true
        });
        console.log(response.data.message);
        localStorage.setItem("user", this.state.name);
        sessionStorage.setItem("token", response.data.token);
        if (response.data.message === "user tidak ditemukan") {
          this.props.history.push("/");
        } else {
          this.props.history.push("/list");
        }
        
      })
      .catch(this.setState({ errMsg: "Invalid username or password" }));
  };

  register() {
    this.props.history.push("/register");
  }

  render() {
    return (
      <div className="login-screen">
        <form className="form" onSubmit={() => this.handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <img
              src={require("../assets/image/logo.png")}
              width="300"
              alt="Hello World"
            />
            <p className="title-login">Welcome Back</p>
          </div>
          <div className="container" style={{ paddingTop: 10 }}>
            <label>
              <b>Username</b>
            </label>
            <input
              class="usepass"
              type="text"
              name="name"
              onChange={this.inputChange}
            ></input>

            <label>
              <b>Password</b>
            </label>
            <input
              class="usepass"
              type="password"
              name="password"
              onChange={this.inputChange}
            ></input>

            <button
              style={{ fontSize: 20, padding: 9 }}
              class="tmbl"
              type="submit"
              Login
              onClick={this.onSubmitForm}
            >
              Login
            </button>
          </div>

          <div
            class="container"
            style={{
              backgroundColor: "#f1f1f1",
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 20
            }}
          >
            <button
              type="button"
              class="cancelbtn"
              onClick={() => this.register()}
            >
              Register
            </button>
            <span class="psw">
              Forgot <Link to="#">password</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
