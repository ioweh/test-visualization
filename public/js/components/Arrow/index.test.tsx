import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Arrow from "./index";

describe("Arrow Component", () => {
  const mockProps = {
    start: { x: 50, y: 100 },
    finish: { x: 150, y: 50 },
    height: 200,
    diff: 20,
  };

  it("renders the arrow path correctly", () => {
    render(<Arrow {...mockProps} />);

    // Check the SVG path
    const pathElement = screen.getByRole("img", { hidden: true }); // hidden role because <path> is not interactive
    expect(pathElement).toBeInTheDocument();

    // Validate path attributes
    const svgPaths = document.querySelectorAll("path");
    expect(svgPaths[0]).toHaveAttribute(
      "d",
      `M${mockProps.start.x},${mockProps.start.y} L${mockProps.start.x},${mockProps.height} L${mockProps.finish.x},${mockProps.height} L${mockProps.finish.x},${mockProps.finish.y}`,
    );
  });
});
