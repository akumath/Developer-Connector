import * as actionTypes from "../actionTypes/types";
import { v4 as uuidv4 } from "uuid";

const removeAlert = (payload) => {
  return {
    type: actionTypes.REMOVE_ALERT,
    payload,
  };
};

const setAlert = (payload) => {
  return {
    type: actionTypes.SET_ALERT,
    payload,
  };
};

export const dispatchSetAlert = (msg, type) => {
  console.log(msg);
  return (dispatch) => {
    const alertInfo = {
      id: uuidv4(),
      msg,
      type,
    };
    dispatch(setAlert(alertInfo));
    setTimeout(() => {
      dispatch(removeAlert(alertInfo.id));
    }, 5000);
  };
};

export const dispatchRemoveAlert = (msg, type) => {
  return (dispatch) => {};
};
