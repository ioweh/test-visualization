import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bar from "./index";

test("renders restart button", () => {
  render(<Bar />);

  const restartButton = screen.getByText(/restart/i);

  expect(restartButton).toBeInTheDocument();
});
