const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));



let posts = [
    {
        id: uuidv4(),
        username : "apnacollege",
        content : "I love Coding!"
    },
    {
        id: uuidv4(),
        username : "Aakash Medge",
        content : "I love Coding too!"
    },
    {
        id: uuidv4(),
        username : "Shraddha Kapoor",
        content : "I love Acting"
    },
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
});

// Update just this route (line ~50 in your file)
app.get('/', (req, res) => {
    res.render('welcome.ejs');
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) =>  {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.get('/', (req, res) => {
    res.send('Welcome to SkyBlog!');
  });
  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});