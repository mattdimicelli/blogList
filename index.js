require('dotenv').config();
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const encodedPw = encodeURIComponent(MONGODB_PASSWORD);
const mongoDbUri = `mongodb+srv://${MONGODB_USERNAME}:${encodedPw}@cluster0.hqzrhkz.mongodb.net/blogList?retryWrites=true&w=majority&appName=Cluster0`;
console.log(mongoDbUri);
const express = require('express');
const index = express();
const cors = require('cors');
const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(mongoDbUri);

index.use(cors());
index.use(express.json());

index.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

index.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

const PORT = 3003;
index.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});