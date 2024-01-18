import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const setError = jest.fn();
  const setErrorMessage = jest.fn();
  const user = userEvent.setup();

  render(
    <BlogForm
      createBlog={createBlog}
      setError={setError}
      setErrorMessage={setErrorMessage}
    />
  );

  const inputTitle = screen.getByPlaceholderText("write title here");
  const inputAuthor = screen.getByPlaceholderText("write author here");
  const inputURL = screen.getByPlaceholderText("write url here");

  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "testing title");
  await user.type(inputAuthor, "testing author");
  await user.type(inputURL, "testing url");
  await user.click(sendButton);
  console.log(createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing title");
  expect(createBlog.mock.calls[0][0].author).toBe("testing author");
  expect(createBlog.mock.calls[0][0].url).toBe("testing url");
});
