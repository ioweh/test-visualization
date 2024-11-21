import * as React from "react";
import * as ReactDOM from "react-dom";
import TestsPassed from "./components/TestsPassed";

const MainComponent = (): JSX.Element => {
  return <TestsPassed />;
};

ReactDOM.render(<MainComponent />, document.getElementById("container"));
