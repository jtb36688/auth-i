import React from "react";
import UsersPage from "./components/UsersPage.js"
import Register from "./components/Register";
import axios from "axios";
axios.defaults.withCredentials = true;

const Authentication = UsersPage => Login =>
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

    // componentDidMount() {
    //   if (localStorage.getItem("logindata")) {
    //     this.setState({
    //       loggedIn: JSON.parse(localStorage.getItem("logindata")).loggedIn,
    //       usernamevalue: JSON.parse(localStorage.getItem("logindata"))
    //         .usernamevalue
    //     });
    //   }
    // }

    // componentDidUpdate() {
    //   localStorage.setItem("logindata", JSON.stringify(this.state));
    // }

    handleChanges = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    submitLogin = e => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/login/", {
          "username": `${this.state.usernamevalue}`,
          "password": `${this.state.passwordvalue}`
        })
        .then(res => {
          this.setState({ loggedIn: true });
        })
        .catch(err => alert(err));
    };

    toggleRegister = () => {
      this.setState(currentState => ({
        registering: !currentState.registering
      }));
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
          <UsersPage
            usernamevalue={this.state.usernamevalue}
            handleLogOut={this.handleLogOut}
          />
        );
      } else {
        if (this.state.registering) {
          return (<Register toggleRegister={this.toggleRegister} />);
        } else {
          return (
            <Login
              passwordvalue={this.state.passwordvalue}
              usernamevalue={this.state.usernamevalue}
              handleChanges={this.handleChanges}
              submitLogin={this.submitLogin}
              toggleRegister={this.toggleRegister}
            />
          );
        }
      }
    };

    render() {
      return this.conditionalRender();
    }
  };

export default Authentication;
