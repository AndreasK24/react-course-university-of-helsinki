import Togglable from "./Togglable";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  console.log("user.id");
  console.log(user.id);
  console.log("blog.user.id");
  console.log(blog.user);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const blogToBeDeleted = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      await deleteBlog(blog.id, blog);
  };
  return (
    <div className="blog" style={blogStyle}>
      Title: {blog.title}
      {blog.user && user.id === blog.user && (
        <button onClick={blogToBeDeleted}>delete</button>
      )}
      <Togglable buttonLabel="view">
        <BlogDetails blog={blog} updateBlog={updateBlog}></BlogDetails>
      </Togglable>
    </div>
  );
};

export default Blog;
