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

describe("UI Tests - Registration Form", () => {
  test("UI-001: Form renders all required elements with proper labels", () => {
    render(<RegistrationForm />);
    // Verify all fields exist
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    // Verify required indicators
    expect(
      screen.getByText("*", { selector: 'label[for="username"] + span' })
    ).toBeInTheDocument();
  });

  test("UI-002: Form handles interactions correctly", async () => {
    render(<RegistrationForm />);
    const usernameInput = screen.getByLabelText(/username/i);
    // Test focus
    fireEvent.focus(usernameInput);
    expect(usernameInput).toHaveClass("focused");
    // Test typing
    fireEvent.change(usernameInput, { target: { value: "test" } });
    expect(usernameInput.value).toBe("test");
    // Test tab navigation
    // Note: userEvent.tab() requires @testing-library/user-event
    // If not installed, install it and import userEvent
    // import userEvent from '@testing-library/user-event';
    // userEvent.tab();
    // expect(screen.getByLabelText(/email/i)).toHaveFocus();
  });
});
