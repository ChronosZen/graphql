import Record from "./components/Record";
import Header from "./components/Header";

import { useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();
function App() {
  const [peopleArr, setPeopleArr] = useState([]);
  return (
    <div className="App">
      <Header peopleArr={peopleArr} />
      <Record peopleArr={peopleArr} setPeopleArr={setPeopleArr} />
    </div>
  );
}

export default App;
