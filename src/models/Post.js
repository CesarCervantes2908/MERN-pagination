const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a Title']
    },
    author: {
        type: String,
        required: [true, 'Please provide an Author']
    },
    body: {
        type: String,
        required: [true, 'Please provide a Body']
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;