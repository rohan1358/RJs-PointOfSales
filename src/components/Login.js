import React, { Component } from "react";
import axios from "axios";
import "../assets/css/Styless.css";

class Login extends Component {
  constructor(props) {
    super(props);
    let loggedIn = false;
    this.state = {
      name: "",
      password: "",
      loggedIn,
      errMsg: "",
      hidden: true
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
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    axios
      .post("http://54.158.219.28:8011/api/v1/user/login", this.state)
      .then(response => {
        this.setState({
          loggedIn: true
        });
        localStorage.setItem("user", this.state.name);
        sessionStorage.setItem("token", response.data.token);
        if (response.data.message === "user tidak ditemukan") {
          this.setState({ hidden: false });
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
            <p
              style={{ marginBottom: 0, color: "red" }}
              hidden={this.state.hidden}
            >
              *username salah
            </p>
            <label>
              <b>Username</b>
            </label>
            <input
              className="usepass"
              type="text"
              name="name"
              onChange={this.inputChange}
            ></input>

            <label>
              <b>Password</b>
            </label>
            <input
              className="usepass"
              type="password"
              name="password"
              onChange={this.inputChange}
            ></input>

            <button
              style={{ fontSize: 20, padding: 9 }}
              className="tmbl"
              type="submit"
              onClick={this.onSubmitForm}
            >
              Login
            </button>
          </div>

          <div
            className="container"
            style={{
              backgroundColor: "#f1f1f1",
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: 20
            }}
          >
            <button
              type="button"
              className="cancelbtn"
              onClick={() => this.register()}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
