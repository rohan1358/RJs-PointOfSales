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
      email: "",
      loggedIn,
      errMsg: "",
      token: localStorage.getItem("token")
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    // console.log(localStorage.getItem("getItem"));
    // if (sessionStorage.getItem("token") !== null) {
    //   this.props.history.push("/list");
    // }
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
    e.preventDefault();
    if (sessionStorage.getItem("token") !== null) {
      this.props.history.push("/list");
    } else {
      this.props.history.push("/");
    }
    console.log(this.state.password.length);
    const lengthPws = this.state.password.length;
    if (lengthPws < 5) {
      alert("password tidak boleh kurang dari 5");
    } else {
      axios
        .post("http://54.157.181.233:8012/api/v1/user/insert", this.state)
        .then(response => {
          this.setState({
            loggedIn: true
          });
          console.log(response);
        })
        .catch(this.setState({ errMsg: "Invalid username or password" }));
    }
  };

  cancel() {
    this.props.history.push("/");
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
            <p className="title-login">Register</p>
          </div>
          <div className="container" style={{ paddingTop: 10 }}>
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
              <b>Email</b>
            </label>
            <input
              className="usepass"
              type="email"
              name="email"
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
              Register
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
              onClick={() => this.cancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
