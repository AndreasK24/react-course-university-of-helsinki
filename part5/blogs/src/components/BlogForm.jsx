import { useState } from "react";

const BlogForm = ({ createBlog, setError, setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setError(false);
    setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  return (
    <form onSubmit={addBlog}>
      <div>Title :</div>
      <input
        value={newTitle}
        onChange={handleTitleChange}
        placeholder="write title here"
      />
      <br></br>
      <div>Author :</div>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
        placeholder="write author here"
      />
      <br></br>
      <div>URL :</div>
      <input
        value={newUrl}
        onChange={handleUrlChange}
        placeholder="write url here"
      />
      <br></br>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
