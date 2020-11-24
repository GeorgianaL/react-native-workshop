import React from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const CoffeeShop = ({ item }) => (
  <Card>
    <Card.Title>HELLO WORLD</Card.Title>
    <Card.Divider />
    <Card.Image source={{ uri: item.image_url }} />
    <Text style={{ marginBottom: 10 }}>{item.name}</Text>
    <Button
      icon={<Icon name="code" color="#ffffff" />}
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      title="VIEW NOW"
    />
  </Card>
);

export default CoffeeShop;
