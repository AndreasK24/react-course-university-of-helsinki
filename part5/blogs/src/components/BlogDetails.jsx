const BlogDetails = ({ blog, updateBlog }) => {
  const addLikeToBlog = async (event) => {
    event.preventDefault();
    await updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes++,
    });
  };
  return (
    <div>
      Author: {blog.author}
      <br></br>
      URL: {blog.url}
      <br></br>
      Likes: {blog.likes} <button onClick={addLikeToBlog}>like</button>
      <br></br>
      {blog.id}
    </div>
  );
};

export default BlogDetails;
