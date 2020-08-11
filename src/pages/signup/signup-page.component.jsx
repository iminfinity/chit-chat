import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  signup,
  signInWithGoogle,
  signInWithGithub,
} from "../../firebase/auth";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./signup.styles.scss";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ error: "" });
    try {
      await signup(email, password);
    } catch (error) {
      setError({ error: error.message });
    }
    history.push("/chat");
    window.location.reload(false);
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError({ error: error.message });
    }
  };

  const githubSignIn = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      setError({ error: error.message });
    }
  };
  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/"> Chit-Chat</Link>
        </h1>
        <div>
          <FormInput
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div>
          <FormInput
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
          />
        </div>
        {error ? <p>{error}</p> : null}
        <CustomButton type="submit">Sign up</CustomButton>
        <hr />
        <div className="sign-in-with">
          <CustomButton onClick={googleSignIn} type="button" isGoogleSignIn>
            Sign up with Google
          </CustomButton>
          <CustomButton onClick={githubSignIn} type="button" isGithubSignIn>
            Sign up with Github
          </CustomButton>
        </div>
        <p className="signin-bottom">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
