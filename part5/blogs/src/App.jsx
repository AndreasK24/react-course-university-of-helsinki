import "./index.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(true);
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken("XXX");
  };

  return (
    <div>
      <h1>Blog list app</h1>

      <Notification message={errorMessage} error={error} />

      {!user && (
        <LoginForm
          setUser={setUser}
          setErrorMessage={setErrorMessage}
          setError={setError}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout()}>logout</button>

          <h1>Create new blog</h1>
          {
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setErrorMessage={setErrorMessage}
              setError={setError}
            />
          }
          <ul>
            {blogs.map((blog, i) => (
              <Blog key={i} blog={blog} />
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
