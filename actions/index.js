import * as types from "./actionTypes";
import Constants from "expo-constants";
import axios from "axios";
import { ActionSheetIOS } from "react-native";

const SEARCH_URL = "/businesses/search";
const api = axios.create({
  baseURL: "https://api.yelp.com/v3",
  headers: {
    Authorization: `Bearer ${Constants.manifest.extra.yelpApiKey}`,
  },
});

const currentLocation = {
  latitude: "51.5265",
  longitude: "-0.0825",
};

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({
      type: types.REQUEST_COFFEE_SHOPS,
    });

    const result = await api.get(SEARCH_URL, {
      params: {
        categories: "coffee,coffeeroasteries,coffeeshops",
        ...currentLocation,
      },
    });

    dispatch({
      type: types.REQUEST_COFFEE_SHOPS_SUCCESS,
      payload: result.data.businesses,
    });
  } catch (error) {
    dispatch({
      type: types.REQUEST_COFFEE_SHOPS_FAIL,
      payload: e.message,
    });
  }
};

export const saveLocation = (location) => (dispatch) => {
  dispatch({
    type: types.SAVE_LOCATION,
    payload: location,
  });
};
