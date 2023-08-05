const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const counter = blogs.reduce((counter, blog) => counter + blog.likes, 0);
  console.log(counter);
  return counter;
};

const favouriteBlog = (blogs) => {
  let mostLikes = { likes: 0 };
  for (let i = 0; i < blogs.length; i++) {
    mostLikes.likes <= blogs[i].likes ? (mostLikes = blogs[i]) : mostLikes;
  }
  console.log(mostLikes);

  const mostLikesBlog = {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  };
  return mostLikesBlog;
};

module.exports = {
  totalLikes,
  dummy,
  favouriteBlog,
};
