import axios from "axios";
import * as actionTypes from "../actionTypes/types";
import { dispatchSetAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import { header } from "express-validator";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

////////////////////// LOAD USER
const loadUser = (payload) => {
  return {
    type: actionTypes.USER_LOADED,
    payload,
  };
};

const authError = () => {
  return {
    type: actionTypes.AUTH_ERROR,
  };
};

export const dispatchLoadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch(loadUser(res.data));
    } catch (err) {
      dispatch(authError());
    }
  };
};

////////////////////// REGISTER USER
const registerSuccess = (payload) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload,
  };
};

const registerFail = () => {
  return {
    type: actionTypes.REGISTER_FAIL,
  };
};

export const dispatchRegister = ({ name, email, password }) => {
  return async (dispatch) => {
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("api/users", body, config);
      dispatch(registerSuccess(res.data));
      dispatch(dispatchLoadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) =>
          dispatch(dispatchSetAlert(error.msg, "danger"))
        );
      }
      dispatch(registerFail());
    }
  };
};

//////////////////////////// LOGIN USER

const loginSuccess = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  };
};

const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const dispatchLogin = (email, password) => {
  return async (dispatch) => {
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("api/auth", body, config);
      dispatch(loginSuccess(res.data));
      dispatch(dispatchLoadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(dispatchSetAlert(error.msg, "danger"))
        );
      }
      dispatch(loginFail());
    }
  };
};

////////////////////////// LOGOUT USER

const logout = () => {
  return {
    type: actionTypes.LOGIN_OUT,
  };
};

export const dispatchLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};
