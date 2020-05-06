import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { dispatchSetAlert } from "../../../actions/alert";
import { dispatchRegister } from "../../../actions/auth";

const Register = (props) => {
  const { dispatchSetAlert, dispatchRegister } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password doesn't match");
      dispatchSetAlert("Password doesn't match", "danger");
    } else {
      console.log(formData);
      dispatchRegister({ name, email, password });
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  dispatchSetAlert: PropTypes.func.isRequired,
  dispatchRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetAlert: (msg, type) => dispatch(dispatchSetAlert(msg, type)),
    dispatchRegister: ({ name, email, password }) =>
      dispatch(dispatchRegister({ name, email, password })),
  };
};
export default connect(null, mapDispatchToProps)(Register);
