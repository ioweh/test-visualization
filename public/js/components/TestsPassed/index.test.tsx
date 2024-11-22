import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestsComponent from "./index";

global.fetch = jest.fn();

describe("TestsComponent", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mock the server data
  const serverData = {
    title: "OS Doors",
    dev: { front: 66, back: 100, db: 31 },
    test: { front: 60, back: 80, db: 31 },
    prod: { front: 66, back: 83, db: 31 },
    norm: 150,
  };

  it("renders loading state initially", () => {
    render(<TestsComponent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles fetch failure", async () => {
    // Mock a fetch error
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<TestsComponent />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    });

    // Add assertions for error UI here if applicable
  });

  it("renders labels on the arrows", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(serverData),
      status: 200,
      ok: true,
    });
    render(<TestsComponent />);

    await waitFor(() => {
      expect(screen.getByText("-26")).toBeInTheDocument();
      expect(screen.getByText("9")).toBeInTheDocument();
    });
  });

  it("renders name of the instance", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(serverData),
      status: 200,
      ok: true,
    });
    render(<TestsComponent />);

    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes("OS Doors")),
      ).toBeInTheDocument();
    });
  });
});
