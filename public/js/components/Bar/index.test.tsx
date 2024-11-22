import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Bar from "./index";

describe("Bar Component", () => {
  const mockHeights = [50, 30, 20];
  const mockLabel = "Test Label";
  const containerHeight = 300;
  const maxBarHeight = 100;

  it("sets the correct tooltip for a standard bar", () => {
    render(
      <Bar
        heights={mockHeights}
        label={mockLabel}
        isStandard={true}
        containerHeight={containerHeight}
        maxBarHeight={maxBarHeight}
      />,
    );

    // Check tooltip
    const bar = screen.getByTitle(`Норматив: ${mockHeights[0]}`);
    expect(bar).toBeInTheDocument();
  });

  it("sets the correct tooltip for a non-standard bar", () => {
    render(
      <Bar
        heights={mockHeights}
        label={mockLabel}
        isStandard={false}
        containerHeight={containerHeight}
        maxBarHeight={maxBarHeight}
      />,
    );

    // Check tooltip
    const tooltip = `Клиент: ${mockHeights[0]} Сервер: ${mockHeights[1]} БД: ${mockHeights[2]}`;
    const bar = screen.getByTitle(tooltip);
    expect(bar).toBeInTheDocument();
  });

  it("renders spans inside each section for non-standard bars", () => {
    render(
      <Bar
        heights={mockHeights}
        label={mockLabel}
        isStandard={false}
        containerHeight={containerHeight}
        maxBarHeight={maxBarHeight}
      />,
    );

    const spans = screen.getAllByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "span" &&
        mockHeights.includes(Number(content))
      );
    });
    expect(spans).toHaveLength(mockHeights.length);
  });
});
