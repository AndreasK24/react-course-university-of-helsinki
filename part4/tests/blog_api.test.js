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

describe("Testing the GET function of the API", () => {
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
});

describe("Testing the POST function of the API", () => {
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

  describe("testing if invalid blogs are rejected and throwing an error", () => {
    test("an invalid blog can not be added if blog has no title", async () => {
      const newBlog = {
        author: "Ich",
        url: "www",
        likes: 2134,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("an invalid blog can not be added if blog has no url", async () => {
      const newBlog = {
        title: "async/await simplifies making async calls",
        author: "Ich",
        likes: 2134,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("an invalid blog can not be added if blog has no title and no url", async () => {
      const newBlog = {
        author: "Ich",
        likes: 1234,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });
});

describe("Testing the PUT function of the API", () => {
  test("a valid blog can be updated ", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const newBlog = {
      id: blogToUpdate.id,
      title: "async/await simplifies making async malls",
      author: "Du",
      url: "www.torbenz.de",
      likes: 19,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect("Content-Type", /application\/json/);
    //console.log("updatedBlog : ", updatedBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain(newBlog.title);
  });

  test("a valid blog can be updated without a likes property (default value = 0)", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const newBlog = {
      id: blogToUpdate.id,
      title: "async/await simplifies making async malls",
      author: "Du",
      url: "www.torbenz.de",
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    blogsAtEnd.map((blog) => expect(blog.likes).toBeDefined());
    const findUpdatedBlog = blogsAtEnd.find(
      (blog) => blog.title === "async/await simplifies making async malls"
    );
    //console.log("findPostedBlog", findUpdatedBlog);
    expect(findUpdatedBlog).toBeDefined();
    if (findUpdatedBlog) expect(findUpdatedBlog.likes).toBeDefined();
    expect(findUpdatedBlog.likes).toBe(0);
  });

  describe("testing if invalid blogs are rejected and throwing an error", () => {
    test("an invalid blog can not be updated if blog has no title", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const newBlog = {
        id: blogToUpdate.id,
        author: "Du",
        url: "www.torbenz.de",
        likes: 19,
      };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400);
    });

    test("an invalid blog can not be updated if blog has no url", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const newBlog = {
        id: blogToUpdate.id,
        title: "async/await simplifies making async malls",
        author: "Du",
        likes: 19,
      };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400);
    });

    test("an invalid blog can not be updated if blog has no title and no url", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const newBlog = {
        id: blogToUpdate.id,
        author: "Du",
        likes: 19,
      };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(400);
    });
  });
});

describe("Testing the DELETE function of the API", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
