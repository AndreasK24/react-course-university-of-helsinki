import "./index.css";
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  /* useState Section */
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* useEffect Section */
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  /* Arrow function Section */
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError(true);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken("XXX");
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
  };
  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject);
    const filteredBlog = blogs.filter((blog) => returnedBlog.id === blog.id);
    const updatedblogs = blogs.map((blog) =>
      blog.id === filteredBlog[0].id ? filteredBlog[0] : blog
    );
    const sortedBlogs = updatedblogs.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };
  const deleteBlog = async (id, blogObject) => {
    await blogService.eliminate(id);
    const updatedblogs = blogs.filter((blog) => blogObject.id !== blog.id);
    const sortedBlogs = updatedblogs.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };
  return (
    <div>
      <h1>Blog list app</h1>

      <Notification message={errorMessage} error={error} />

      {!user && (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <h1>Create new blog</h1>
          {
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
                setError={setError}
                setErrorMessage={setErrorMessage}
              />
            </Togglable>
          }
          <ul>
            {blogs.map((blog, i) => (
              <Blog
                key={i}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
