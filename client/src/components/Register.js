import React from "react";
import { Button } from "reactstrap";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/register/", {
      headers: {
        username: `${this.state.username}`,
        password: `${this.state.password}`
      }
    })
    .then(res => {
      this.setState({ users: res.data });
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Register User</h2>
        <form onSubmit={this.handleRegister}>
          <input
            name="username"
            placeholder="username"
            onChange={this.handleChanges}
          />
          <input
            name="password"
            placeholder="password"
            onChange={this.handleChanges}
          />
          <Button type="submit">Register User</Button>
        </form>
        <Button type="button" onClick={this.props.toggleRegister}>
          {" "}
          Back to Login{" "}
        </Button>
      </div>
    );
  }
}

export default Register;
