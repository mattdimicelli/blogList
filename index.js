const { PORT, mongoDbUri} = require('./utils/config');
const Blog = require('./models/blogs');
const express = require('express');
const index = express();
const cors = require('cors');
const mongoose = require('mongoose');




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

index.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});