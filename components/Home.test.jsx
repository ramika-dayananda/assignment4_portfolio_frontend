import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock the AuthContext used by Home so the component can render in isolation.
// This mock must be established before importing the component.
vi.mock("../src/AuthContext.jsx", () => ({
  useAuth: () => ({ user: { name: "Test User" } }),
}));

import Home from "./Home.jsx";

test("renders greeting text", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const text = screen.getByText(/Hi/i);
  expect(text).toBeInTheDocument();
});
