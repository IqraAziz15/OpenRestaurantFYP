import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_RESTAURANT_SUCCESS,
    REGISTER_RESTAURANT_FAIL,
    REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_SUCCESS,
    REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL
} from "../../actions/superAdmin/types";
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
      case REGISTER_RESTAURANT_SUCCESS:
      case REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
      case REGISTER_RESTAURANT_FAIL:
      case REGISTER_RESTAURANT_AND_RESTAURANT_ADMIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
  }