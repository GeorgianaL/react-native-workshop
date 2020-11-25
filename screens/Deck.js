import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cards from "../components/Cards";
import { fetchData } from "../actions";

const Deck = () => {
  const dispatch = useDispatch();
  const coffeeShops = useSelector((reduxState) => reduxState.coffeeShops);
  const loading = useSelector((reduxState) => reduxState.loading);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Cards data={coffeeShops} onSwipeRight={() => {}} onSwipeLeft={() => {}} />
  );
};

export default Deck;
