import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, PanResponder } from "react-native";
import Constants from "expo-constants";
import axios from "axios";

import Cards from "../components/Cards";

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

const Deck = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await api.get(SEARCH_URL, {
        params: {
          categories: "coffee,coffeeroasteries,coffeeshops",
          ...currentLocation,
        },
      });

      setData(result.data.businesses);
    }

    fetchData();
  }, []);

  return <Cards data={data} onSwipeRight={() => {}} onSwipeLeft={() => {}} />;
};

export default Deck;
