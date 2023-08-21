import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setErrorMessage, setError }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };
  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setError(false);
    setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return (
    <form onSubmit={addBlog}>
      <div>Title :</div>
      <input value={newTitle} onChange={handleTitleChange} />
      <br></br>
      <div>Author :</div>
      <input value={newAuthor} onChange={handleAuthorChange} />
      <br></br>
      <div>URL :</div>
      <input value={newUrl} onChange={handleUrlChange} />
      <br></br>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
