import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  isGithubSignIn,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} 
    ${isGoogleSignIn ? "google-sign-in" : ""}  
    ${isGithubSignIn ? "github-sign-in" : ""} 
    custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
