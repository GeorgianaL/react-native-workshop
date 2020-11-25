import { REHYDRATE } from "redux-persist";

import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
  coffeeShops: [],
  error: null,
  location: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, coffeeshops: action.payload } || state;
    case types.REQUEST_COFFEE_SHOPS:
      return {
        ...state,
        loading: true,
      };
    case types.REQUEST_COFFEE_SHOPS_SUCCESS:
      return {
        ...state,
        loading: false,
        coffeeShops: action.payload,
      };

    case types.REQUEST_COFFEE_SHOPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SAVE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
