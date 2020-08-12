import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ onChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={onChange} {...otherProps} />
  </div>
);

export default FormInput;
