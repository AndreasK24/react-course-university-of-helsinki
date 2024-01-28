const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  /*Blog.find({}).then((blogs) => {
    response.json(blogs);
  });*/
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const user = request.user;
    if (!user || !body.title || !body.url) {
      response.status(400).end();
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user.id,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    }
  }
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);

    const user = request.user;

    if (user && blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else return response.status(401).json({ error: "invalid user" });
  }
);

blogsRouter.put(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;
    const user = request.user;
    const blogToBeUpdated = await Blog.findById(request.params.id);
    if (!user || !body.title || !body.url) {
      response.status(400).end();
    } else {
      if (blogToBeUpdated.user.toString() === user.id.toString()) {
        const blog = new Blog({
          id: request.params.id,
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes ? body.likes : 0,
          user: user.id,
        });

        const updatedBlog = await Blog.findByIdAndUpdate(
          request.params.id,
          blog,
          {
            new: true,
          }
        );
        response.json(updatedBlog);
      } else return response.status(401).json({ error: "invalid user" });
    }
  }
);

module.exports = blogsRouter;
