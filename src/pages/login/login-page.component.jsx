import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../../firebase/auth";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { withRouter } from "react-router-dom";

import "./login-page.styles.scss";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ error: "" });
    try {
      await signin(email, password);
    } catch (error) {
      setError({ error: error.message });
    }

    history.push("/chat");
    window.location.reload(false);
  };

  return (
    <div className="login-page">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>
          Login to
          <Link to="/"> Chit-Chat</Link>
        </h1>
        <div>
          <FormInput
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <FormInput
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
            required
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <CustomButton type="submit">Login</CustomButton>
        </div>
        <p className="login-bottom">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Login);
