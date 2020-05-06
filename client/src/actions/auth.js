import axios from "axios";
import * as actionTypes from "../actionTypes/types";
import { dispatchSetAlert } from "./alert";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

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
