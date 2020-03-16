// import React, { Component } from 'react';

// class Login extends Component {
//     constructor(props) {
//             super();
//             let loggedIn = false;
//             this.state = {
//               name: "",
//               password: "",
//               loggedIn,
//             }
//         }
//     render() {
//         return (
//             <div>
//                 <h1>Login</h1>

//                 <form onSubmit={this.handlerSubmit}>
//                     <label>email</label>
//                     <input type="text" name="name" onChange={this.onChange} defaultValue={this.state.name} />

//                     <label>password</label>
//                     <input
//                         type="password"
//                         name="password" value={this.state.name}
//                         onChange={this.onChange}
//                     />

//                     <button type="submit">Login</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default Login;

// import React, { Component } from "react";
// import Axios from "axios";
// import { Redirect } from "react-router-dom";

// class Login extends Component {
//   constructor(props) {
//     super();
//     let loggedIn = false;
//     this.state = {
//       name: "",
//       password: "",
//       loggedIn
//     };
//     this.handlerChange = this.handlerChange.bind(this)
//     this.handlerSubmit = this.handlerSubmit.bind(this)
//   }

//   handlerChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handlerSubmit = e => {
//     const config = {
//       headers: {
//         "content-Type": "application/json",
//         accept: "application/json",
//       }
//     };
//     e.preventDefault();
//     console.log(this.state.name, this.state.password);
//     Axios.post("localhost:8080/api/v1/user/login", this.state, config)
//       .then(response => {
//         this.setState({
//           loggedIn: true
//         });
//         localStorage.setItem("token", response.data.token);
//         this.props.history.push("/");
//       })
//       .catch(this.setState({ errMsg: "invalid" }));
//   };

//   render() {
//       if(this.state.loggedIn){
//           return <Redirect to="/"/>
//       }
//     return (
//       <div>
//         <form onSubmit={this.handlerSubmit}>
//           <label>email</label>
//           <input type="text"
//           name="name"
//           onChange={this.handlerChange}
//           defaultValue={this.state.name}
//           />

//           <label>password</label>
//           <input
//             type="password"
//             name="password"
//             onChange={this.handlerChange}
//           defaultValue={this.state.password}

//           />

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Login;

import React, { Component } from "react";
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
      // }
      // ,
      // this.inputChange=this.inputChange.bind(this)
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    // axios.post("http://localhost:8080/api/user/login").then((response) => {
    //   this.setState({
    //     users: response.data.result
    //   })
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  inputChange = e => {
    // console.log(e.target.value);
    // let newdataPost = {...this.state.data};
    // new dataPost['id'] = '2'
    // new dataPost['password'] = e.target.value

    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  onSubmitForm = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/user/login", this.state)
      .then(response => {
        this.setState({
          loggedIn: true
        });
        localStorage.setItem("token", response.data.token);
        console.log(response.data.message);
        if (response.data.message === "user tidak ditemukan") {
          this.props.history.push("/");
        } else {
          this.props.history.push("/list");
        }
      })
      .catch(this.setState({ errMsg: "Invalid username or password" }));
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={() => this.handleSubmit}>
          <div style={{textAlign:"center"}}>
            <h1>Login</h1>
          </div>
          <div className="container" style={{paddingTop:10}}>
            <label>
              <b>Username</b>
            </label>
            <input class="usepass" type="text" name="name" onChange={this.inputChange}></input>

            <label>
              <b>Password</b>
            </label>
            <input class="usepass" type="password" name="password" onChange={this.inputChange}></input>

            <button class="tmbl" type="submit" Login onClick={this.onSubmitForm}>
              Login
            </button>
          </div>

          <div
            class="container"
            style={{
              backgroundColor: "#f1f1f1",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <button type="button" class="cancelbtn">
              Cancel
            </button>
            <span class="psw">
              Forgot <Link to="#">password</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }

  // render(){
  //   return(
  //     <Container>
  //       <Form style={{marginTop: 100}} onSubmit={() => this.handleSubmit}>
  //         <Form.Group as={Row} controlId="formHorizontalEmail">
  //           <Form.Label column sm={2}>
  //             username
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control
  //               type="text"
  //               name="name"
  //               onChange={this.inputChange}
  //             />
  //           </Col>
  //         </Form.Group>

  //         <Form.Group as={Row} controlId="formHorizontalPassword">
  //           <Form.Label column sm={2}>
  //             Password
  //           </Form.Label>
  //             <Col sm={10}>
  //               <Form.Control
  //                 type="password"
  //                 name="password"
  //                 onChange={this.inputChange} />
  //             </Col>
  //         </Form.Group>

  //         <Form.Group as={Row}>
  //           <Col sm={{ span: 10, offset: 2 }}>
  //             <Button type="submit" onClick={this.onSubmitForm}>Sign in</Button>
  //           </Col>
  //         </Form.Group>
  //       </Form>
  //     </Container>
  //   )
  // }
}

export default Login;
