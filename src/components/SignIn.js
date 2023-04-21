import React, { useState } from "react";
import * as Components from "./Components";
import axios from "axios";
import "../styles.css";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [signIn, setSignIn] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    let email = event.target.value;
    setEmail(email);
    console.log(email);
  };

  const handlePasswordChange = (event) => {
    let pass = event.target.value;
    setPassword(pass);
    console.log(pass);
  };

  const toggleIsSignIn = (val) => {
    setSignIn(val);
  };

  const handleConfirmPasswordChange = (event) => {
    let pass = event.target.value;
    setConfirmPassword(pass);
  };

  const handleNameChange = (event) => {
    let name = event.target.value;
    setName(name);
  };

  const callApiSignUP = () => {
    alert("Great that you have signed up now!");
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post(window.host + "/api/v1.0/signup", userData)
      .then((response) => {
        console.log(response.data);
        // handle response data here
      })
      .catch((error) => {
        console.error(error);
        // handle error here
      });
    toggleIsSignIn(true);
  };

  const callApiSignIn = async (event) => {
    event.preventDefault();
    console.log({ email, password });

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${window.host}/api/v1.0/login`,
        userData
      );
      console.log(response);

      if (response.status !== 400) {
        alert("User logged in successfully!");
        setSignIn(false);
        navigate("/TopVulnerabilities");
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred. Please try again - " + error);
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            id="name"
            placeholder="Name"
            onChange={handleNameChange}
          />
          <Components.Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <Components.Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <Components.Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
          />
          <Components.Button onClick={callApiSignUP}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
          />
          <Components.Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={callApiSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggleIsSignIn(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggleIsSignIn(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default SignIn;
