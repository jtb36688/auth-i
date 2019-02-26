import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Users from "./Users";

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  // componentDidMount() {
  //   axios({
  //     url: 'http://localhost:5000/api/users',
  //     method: "GET",
  //     headers: {
  //       username: "jacob",
  //       password: "bryan"
  //     }
  //   })
  // }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users/", {
        headers: {
          username: "jacob",
          password: "bryan"
        }
      })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Users usersarray={this.state.users} />
      </div>
    );
  }
}

export default UsersPage;
