const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Load static file

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// REST API (Backend)

mongoose.connect('mongodb+srv://grantge:50kpgwhZO4ijOozP@cl1.hvlyx.mongodb.net/personal-blog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const schemaPosts = new Schema({
    title: String,
    message: String,

}, { versionKey: false });

const Post = mongoose.model('posts', schemaPosts);

// GET request (all data)

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) return console.log(err);
        res.send(posts)
    });
});

// GET request (one posts)

app.get('/posts/:id', (req, res) => {

    const id = req.params.id;
    Post.findOne({_id: id}, (err, post) => {
        if (err) return console.log(err);
        res.send(post)
    });
});

// POST request

app.post('/posts', express.json(), (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const postTitle = req.body.title;
    const postMessage = req.body.message;
    
    const post = new Post({title: postTitle, message: postMessage});

    post.save((err) => {
        if (err) return console.log(err);
        res.send(post)
    });
});

// UPDATE request

app.put('/posts', express.json(), (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const postTitle = req.body.title;
    const postMessage = req.body.message;
    const newPost = {title: postTitle, message: postMessage};

    Post.findOneAndUpdate({_id: id}, newPost, {new: true}, (err, post) => {
        if(err) return console.log(err);
        res.send(post);
    });
});

// DELETE request

app.delete('/posts/:id', (req, res) => {
    
    const id = req.params.id;

    Post.findByIdAndDelete(id, (err, post) => {
        if (err) return console.log(err);
        res.send(post);
    });
});