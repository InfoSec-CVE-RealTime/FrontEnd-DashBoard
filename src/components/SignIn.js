import React from "react";
import { useState } from "react";
import * as Components from "./Components";
import { version } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const FLASK_SERVER_IP = "http://127.0.0.1:5000";

function SignIn() {
  console.log(version);
  const [signIn, toggle] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function callApiSignUP() {
    alert("Great that you have signed up now!");
    console.log(name, email, password);
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch(FLASK_SERVER_IP + "/api/v1.0/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle response data here
      })
      .catch((error) => {
        console.error(error);
        // handle error here
      });
    toggle(true);
  }

  function callApiSignIn() {
    const userData = {
      email: email,
      password: password,
    };

    fetch(FLASK_SERVER_IP + "/api/v1.0/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(responseHandler)
      .then((data) => {
        alert("User logged in successfully!");
        navigate("/TopVulnerabilities");
      })
      .catch((error) => {
        alert("Error occurred. Please try again.");
        console.log(error);
      });
  }

  function responseHandler(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
          <Components.Button onClick={callApiSignIn}>
            Sigin In
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter Your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default SignIn;
