import React from "react";

import { Typography, Divider } from "antd";

import AddPerson from "./AddPerson";
import AddCar from "./AddCar";

const { Title } = Typography;

const Header = () => {
  return (
    <header className="App-header">
      <Title level={2} style={{ textAlign: "center" }}>
        PEOPLE AND THEIR CARS
      </Title>
      <Divider />
      <AddPerson />
      <AddCar />
    </header>
  );
};

export default Header;
