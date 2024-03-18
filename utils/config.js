require('dotenv').config()

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env
const encodedPw = encodeURIComponent(MONGODB_PASSWORD)
const mongoDbUri = `mongodb+srv://${MONGODB_USERNAME}:${encodedPw}@cluster0.hqzrhkz.mongodb.net/blogList?retryWrites=true&w=majority&appName=Cluster0`
console.log(mongoDbUri)

const PORT = 3003

module.exports = {
  PORT,
  mongoDbUri,
}
