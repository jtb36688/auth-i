import React from "react";
import styled, { css } from "styled-components";

const Login = props => {
  return (
    <LoginContainer>
      <LoginDialog>
        <LoginForm onSubmit={props.submitLogin}>
          <h1 className="LoginTitle">Users Database Login</h1>
          Please Login:
          <InputsButtonsDiv>
            <InputsDiv>
              <UsernameDiv>
                <div>Username:</div>
                <UsernameInput
                  value={props.usernamevalue}
                  type="text"
                  name="usernamevalue"
                  onChange={props.handleChanges}
                />
              </UsernameDiv>
              <PasswordDiv>
                <div>Password:</div>
                <PasswordInput
                  value={props.passwordvalue}
                  type="password"
                  name="passwordvalue"
                  onChange={props.handleChanges}
                />
              </PasswordDiv>
            </InputsDiv>
            <LoginButton type="submit">
              Login
            </LoginButton>
          </InputsButtonsDiv>
        </LoginForm>
      </LoginDialog>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
background-color: #f7f7f7;
width: 100%;
height: 100%;
font-family: Neue Helvetica;
font-size: 18px;
h1 {
  font-family: Verdana;
  font-size: 28px;
}
`

const LoginDialog = styled.div`
height: 500px;
border-radius: 5px;
`

const LoginForm = styled.form`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
margin-top: 150px;
border: 1px solid #8b9dc3;
`

const InputsButtonsDiv = styled.div`
display: flex;
height: 35%;
width: 65%;
justify-content: space-between;
align-items: center;
`

const InputsDiv = styled.div`
height: 100%;
width: 75%;
display: flex;
justify-content: space-around;
flex-direction: column;
`

const UsernameDiv = styled.div`
display: flex;
justify-content: space-around;
align-items: baseline;
`

const PasswordDiv = styled.div`
display: flex;
justify-content: space-around;
align-items: baseline;
`

const UsernameInput = styled.input`
margin-left: 20px;
border: 0;
background-color: #8b9dc3;
color: white;
height: 40px;
border-radius: 3px;
text-align: center;
width: 60%;
font-weight: bold;
`

const PasswordInput = styled.input`
margin-left: 20px;
border: 0;
background-color: #8b9dc3;
color: white;
height: 40px;
border-radius: 3px;
text-align: center;
width: 60%;
font-weight: bold;
`

const LoginButton = styled.button`
display: block;
height: 50px;
width: 100px;
border-radius: 5px;
color: white;
background-color: #3b5998;
`

export default Login;
