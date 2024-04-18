import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";

describe("App Component Simple Routing Tests", () => {
  const setup = (initialRoute = "/") => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  it('renders the Home component for "/"', () => {
    setup("/");
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('renders the Settings component for "/settings"', () => {
    setup("/settings");
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  it('renders the Users component for "/users"', () => {
    setup("/users");
    expect(screen.getByText(/users/i)).toBeInTheDocument();
  });
});
