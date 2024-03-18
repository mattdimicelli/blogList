const dummy = (blogs) => {
  return 1
}

const totalLikes = (arrOfBlogPosts) => {
  return arrOfBlogPosts.reduce((total, post) => {
    return total + post.likes
  }, 0)
}

const favoriteBlog = (arrOfBlogs) => {
  if (arrOfBlogs.length === 0) {
    return undefined
  }

  let mostLikes = 0
  let mostLikedBlog
  for (const blog of arrOfBlogs) {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      mostLikedBlog = blog
    }
  }
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogs = (arrOfBlogs) => {
  if (arrOfBlogs.length === 0) {
    return undefined
  }
  const blogsPerAuthor = {}

  for (const blog of arrOfBlogs) {
    if (!Object.prototype.hasOwnProperty.call(blogsPerAuthor, blog.author)) {
      blogsPerAuthor[blog.author] = 1
    } else {
      blogsPerAuthor[blog.author] += 1
    }
  }

  let mostBlogs = 0
  let mostProlificAuthor
  for (const [author, blogs] of Object.entries(blogsPerAuthor)) {
    if (blogs > mostBlogs) {
      mostBlogs = blogs
      mostProlificAuthor = author
    }

  }

  return { author: mostProlificAuthor, blogs: mostBlogs }
}

const mostLikes = (arrOfBlogs) => {
  if (arrOfBlogs.length === 0) {
    return undefined
  }
  const likesPerAuthor = {}

  for (const blog of arrOfBlogs) {
    if (!Object.prototype.hasOwnProperty.call(likesPerAuthor, blog.author)) {
      likesPerAuthor[blog.author] = blog.likes
    } else {
      likesPerAuthor[blog.author] += blog.likes
    }
  }

  let mostLikes = 0
  let mostLikedAuthor
  for (const [author, likes] of Object.entries(likesPerAuthor)) {
    if (likes > mostLikes) {
      mostLikes = likes
      mostLikedAuthor = author
    }

  }

  return { author: mostLikedAuthor, likes: mostLikes }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
