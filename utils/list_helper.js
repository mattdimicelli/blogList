const dummy = (blogs) => {
  return 1;
}

const totalLikes = (arrOfBlogPosts) => {
  return arrOfBlogPosts.reduce((total, post) => {
    return total + post.likes;
  }, 0);
}

const favoriteBlog = (arrOfBlogs) => {
  if (arrOfBlogs.length === 0) {
    return undefined;
  }

  let mostLikes = 0;
  let mostLikedBlog;
  for (let blog of arrOfBlogs) {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      mostLikedBlog = blog;
    }
  }
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}