import React from "react";

import { Typography, Divider } from "antd";

import AddPerson from "./people/AddPerson";
import AddCar from "./car/AddCar";

const { Title } = Typography;

const Header = ({ peopleArr }) => {
  return (
    <header className="App-header">
      <Title level={2} style={{ textAlign: "center" }}>
        PEOPLE AND THEIR CARS
      </Title>
      <Divider />
      <AddPerson />
      {peopleArr.length > 0 && <AddCar />}
    </header>
  );
};

export default Header;
