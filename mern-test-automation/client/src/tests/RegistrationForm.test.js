import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RegistrationForm from "../components/RegistrationForm";

describe("RegistrationForm", () => {
  test("renders registration form", () => {
    render(<RegistrationForm />);
    expect(screen.getByText("User Registration")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  test("shows validation errors for empty form submission", async () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByText("Register"));

    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  test("shows validation for invalid email", async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();
  });
});
