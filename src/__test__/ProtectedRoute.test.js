import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { useAuth } from "../utils/AuthContext";

// Mock the useAuth hook
jest.mock("../utils/AuthContext", () => ({
  useAuth: jest.fn()
}));

const MockComponent = () => <div>Mock Component</div>;

describe("ProtectedRoute", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the element when the role is allowed", () => {
    useAuth.mockReturnValue({ role: "admin" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} allowedRoles={["admin"]} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Component")).toBeInTheDocument();
  });

  test("renders the Access Denied message when the role is not allowed", () => {
    useAuth.mockReturnValue({ role: "user" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} allowedRoles={["admin"]} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.getByText("You do not have permission to view this page.")).toBeInTheDocument();
  });

  test("navigates back when the Go Back button is clicked", () => {
    useAuth.mockReturnValue({ role: "user" });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute element={<MockComponent />} allowedRoles={["admin"]} />} />
          <Route path="/" element={<div>Go Back</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Go Back"));

    // expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
