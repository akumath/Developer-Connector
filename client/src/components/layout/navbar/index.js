import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dispatchLogout } from "../../../actions/auth";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const { dispatchLogout, auth } = props;
  const { isAuthenticated, loading } = auth;
  const guestLinks = (
    <ul>
      <li>
        <Link to="/">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/login">Logout</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <a href="!#" onClick={dispatchLogout}>
          <i className="fas fa-sign-out"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  dispatchLogout: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogout: () => dispatch(dispatchLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
