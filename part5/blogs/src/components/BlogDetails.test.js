import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogDetails from "./BlogDetails";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Compo",
  };

  const { container } = render(<BlogDetails blog={blog} />);

  // screen.debug();

  const div = container.querySelector(".blogDetails");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

// test("clicking the button calls event handler once", async () => {
//   const blog = {
//     title: "Component testing is done with react-testing-library",
//     author: "Compo",
//   };

//   const mockHandler = jest.fn();

//   render(<Blog blog={blog} />);

//   const user = userEvent.setup();
//   const button = screen.getByText("make not important");
//   await user.click(button);

//   expect(mockHandler.mock.calls).toHaveLength(1);
// });
