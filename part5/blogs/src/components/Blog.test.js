import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Compo",
  };

  const { container } = render(<Blog blog={blog} />);

  // screen.debug();

  const div = container.querySelector(".blogDetails");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

test("renders content (URL and likes)", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Compo",
    url: "HATZER",
    likes: 4,
  };

  const { container } = render(<Blog blog={blog} />);

  // screen.debug();

  const div = container.querySelector(".blogDetails");
  expect(div).toHaveTextContent("HATZER");
  expect(div).toHaveTextContent("4");
});

test("<Blog /> updates likes after clicking button", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Compo",
    url: "HATZER",
    likes: 4,
  };
  const updateBlog = jest.fn();

  const user = userEvent.setup();

  render(<Blog blog={blog} updateBlog={updateBlog} />);

  const sendButton = screen.getByText("like");

  await user.click(sendButton);
  await user.click(sendButton);

  expect(updateBlog.mock.calls).toHaveLength(2);
});
