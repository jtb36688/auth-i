import React from "react";
import Axios from "axios";
axios.defaults.withCredentials = true

const Authentication = PostsPage => Login =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        registering: false,
        usernamevalue: "",
        passwordvalue: ""
      };
    }

    componentDidMount() {
      if (localStorage.getItem("logindata")) {
        this.setState({
          loggedIn: JSON.parse(localStorage.getItem("logindata")).loggedIn,
          usernamevalue: JSON.parse(localStorage.getItem("logindata"))
            .usernamevalue
        });
      }
    }

    componentDidUpdate() {
      localStorage.setItem("logindata", JSON.stringify(this.state));
    }

    handleChanges = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    submitLogin = e => {
      e.preventDefault();
      if (!this.state.usernamevalue || !this.state.passwordvalue) {
        this.setState({
          usernamevalue: "",
          passwordvalue: ""
        });
        alert("Invalid login, please enter Username and Password");
      } else {
        this.setState({
          loggedIn: true
        });
      }
    };

    handleLogOut = () => {
      this.setState({
        loggedIn: false,
        usernamevalue: "",
        passwordvalue: ""
      });
    };

    conditionalRender = () => {
      if (this.state.loggedIn) {
        return (
          <App
            usernamevalue={this.state.usernamevalue}
            handleLogOut={this.handleLogOut}
          />
        );
      } else {
        return (
          <Login
            passwordvalue={this.state.passwordvalue}
            usernamevalue={this.state.usernamevalue}
            handleChanges={this.handleChanges}
            submitLogin={this.submitLogin}
          />
        );
      }
    };

    render() {
      return this.conditionalRender();
    }
  };

export default Authentication;
