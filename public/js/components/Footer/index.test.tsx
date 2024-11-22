import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestsFooter from "./index";

describe("TestsFooter Component", () => {
  const infoItems = [
    {
      colorClass: "footer__info__color--client",
      text: "Клиентская часть",
    },
    {
      colorClass: "footer__info__color--server",
      text: "Серверная часть",
    },
    {
      colorClass: "footer__info__color--database",
      text: "База данных",
    },
  ];

  it("applies the correct color class to each info item", () => {
    render(<TestsFooter />);

    // Check that each info item contains the correct color class
    infoItems.forEach((item) => {
      const coloredDiv = screen.getByText(item.text).previousSibling;
      expect(coloredDiv).toHaveClass(item.colorClass);
    });
  });
});
