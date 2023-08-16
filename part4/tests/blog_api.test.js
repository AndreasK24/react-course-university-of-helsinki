const supertest = require("supertest");
const mongoose = require("mongoose");

const helper = require("../tests/test_helpers_blog");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");

  const blogs = response.body.map((r) => r);
  blogs.map((blog) => expect(blog.id).toBeDefined());
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Ich",
    url: "www",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  expect(titles).toContain("async/await simplifies making async calls");
});

test("a valid blog can be added without a likes property (default value = 0)", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Ich",
    url: "www",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogs = blogsAtEnd.map((n) => n);
  blogs.map((blog) => expect(blog.likes).toBeDefined());
  const findPostedBlog = blogs.find(
    (blog) => blog.title === "async/await simplifies making async calls"
  );
  console.log("findPostedBlog", findPostedBlog);
  expect(findPostedBlog).toBeDefined();
  if (findPostedBlog) expect(findPostedBlog.likes).toBeDefined();
  expect(findPostedBlog.likes).toBe(0);
});

test("a invalid blog can not be added if blog has no title", async () => {
  const newBlog = {
    author: "Ich",
    url: "www",
    likes: 2134,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a invalid blog can not be added if blog has no url", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Ich",
    likes: 2134,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a invalid blog can not be added if blog has no title and no url", async () => {
  const newBlog = {
    author: "Ich",
    likes: 1234,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
