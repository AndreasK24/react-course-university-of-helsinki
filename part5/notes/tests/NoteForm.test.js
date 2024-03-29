import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

import NoteForm from "../src/components/NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByPlaceholderText("write note content here");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
