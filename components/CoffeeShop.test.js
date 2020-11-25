import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import businesses from "./fixturesTest";

// Components
import CoffeeShop from "./CoffeeShop";

describe("CoffeeShop Card Test Suite", () => {
  it("CoffeShop Card Renders As Expected", () => {
    const { toJSON } = render(<CoffeeShop item={businesses.businesses[0]} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("CoffeShop Card Renders As Expected", () => {
    const { toJSON, getAllByTestId } = render(
      <CoffeeShop item={businesses.businesses[0]} />
    );
    const testID = "testCardId";
    expect(getAllByTestId(testID).length).toEqual(1);
  });
});
