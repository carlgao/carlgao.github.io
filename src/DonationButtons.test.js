import React from "react";
import { fireEvent, render, wait } from "@testing-library/react";
import DonationButtons from "./DonationButtons";

const email = "money94539@gmail.com";
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function setClipboard(value) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value,
  });
}

function openZelle(view) {
  const button = view.getByLabelText("Donate with Zelle", { selector: "button" });
  // Popover needs an on-screen anchor; jsdom does not perform layout.
  button.getBoundingClientRect = () => ({
    top: 0, left: 0, right: 80, bottom: 36, width: 80, height: 36,
  });
  fireEvent.click(button);
  return view.getByLabelText("Zelle email");
}

function expectSelectableEmail(input) {
  expect(input).toHaveValue(email);
  expect(input.readOnly).toBe(true);
  fireEvent.focus(input);
  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(email.length);
}

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  } else {
    delete navigator.clipboard;
  }
});

test("payment links open the requested destinations in separate tabs", () => {
  const view = render(<DonationButtons />);
  const links = [
    [view.getByLabelText("Donate with Venmo (opens in a new tab)"), "https://venmo.com/u/Carl-Gao"],
    [view.getByLabelText("Donate with PayPal (opens in a new tab)"), "https://paypal.me/venuslabs"],
  ];

  links.forEach(([link, destination]) => {
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", destination);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test("Zelle offers a selectable email, banking instructions, and copy confirmation", async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  setClipboard({ writeText });
  const view = render(<DonationButtons />);
  const input = openZelle(view);

  expectSelectableEmail(input);
  expect(view.getByText(/In your banking app, open Zelle/)).toBeInTheDocument();
  expect(view.getByLabelText("Donate with Zelle", { selector: "button" })).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(view.getByText("Copy email"));

  await wait(() => expect(view.getByRole("status")).toHaveTextContent("Email copied."));
  expect(writeText).toHaveBeenCalledTimes(1);
  expect(writeText).toHaveBeenCalledWith(email);
  expect(view.getByText("Copy email").closest("button")).not.toBeDisabled();
});

test("clipboard rejection explains manual copying and leaves the email selectable", async () => {
  const writeText = jest.fn().mockRejectedValue(new Error("Permission denied"));
  setClipboard({ writeText });
  const view = render(<DonationButtons />);
  const input = openZelle(view);
  fireEvent.click(view.getByText("Copy email"));

  await wait(() => expect(view.getByRole("status")).toHaveTextContent("Couldn’t copy. Select the email and copy it manually."));
  expectSelectableEmail(input);
  expect(view.getByText("Copy email").closest("button")).not.toBeDisabled();
});

test("an unavailable clipboard API also offers manual copying", async () => {
  setClipboard(undefined);
  const view = render(<DonationButtons />);
  const input = openZelle(view);
  fireEvent.click(view.getByText("Copy email"));

  await wait(() => expect(view.getByRole("status")).toHaveTextContent("Couldn’t copy. Select the email and copy it manually."));
  expectSelectableEmail(input);
});

test("closing and reopening Zelle clears the previous copy confirmation", async () => {
  setClipboard({ writeText: jest.fn().mockResolvedValue(undefined) });
  const view = render(<DonationButtons />);
  openZelle(view);
  fireEvent.click(view.getByText("Copy email"));
  await wait(() => expect(view.getByRole("status")).toHaveTextContent("Email copied."));

  fireEvent.click(view.getByText("Close"));
  await wait(() => expect(view.queryByRole("dialog")).not.toBeInTheDocument());
  expect(view.getByLabelText("Donate with Zelle", { selector: "button" })).toHaveAttribute("aria-expanded", "false");
  openZelle(view);
  expect(view.getByRole("status")).toBeEmpty();
});
