const dummy = (blogs) => {
  return 1;
}

const totalLikes = (arrOfBlogPosts) => {
  return arrOfBlogPosts.reduce((total, post) => {
    return total + post.likes;
  }, 0);
}

module.exports = {
  dummy, totalLikes
}