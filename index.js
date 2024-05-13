import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
let postsTab = [];

app.use(express.static("public"));
app.use("/posts",express.static("public"));
app.use("/posts/update/",express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("home.ejs");
})

app.get("/posts", (req, res)=>{
    res.render("posts.ejs", {tab:postsTab});
})

app.get("/posts/HowToDoIt", (req, res)=>{
    res.render("posts/HowToDoIt.ejs");
})

app.get("/posts/delete/:usertitle", (req, res)=>{
    const index = postsTab.findIndex((element) => element.usertitle === req.params.usertitle);
    if (index > -1) {
        postsTab.splice(index, 1);
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
})

app.get("/posts/update/:usertitle", (req, res)=>{
    const post = postsTab.find((element) => element.usertitle === req.params.usertitle);
    if (post) {
        res.render("posts/update.ejs", post);
    } else {
        res.status(404).send("Post not found");
    }
})

app.get("/posts/:usertitle", (req, res)=>{
    const post = postsTab.find((element) => element.usertitle === req.params.usertitle);
    if (post) {
        res.render("posts/post.ejs", post);
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/create", (req, res)=>{
    res.render("create.ejs");
})

app.get("/update", (req, res)=>{
    res.render("update.ejs", {tab:postsTab});
})

app.get("/delete", (req, res)=>{
    res.render("delete.ejs", {tab:postsTab});
})

app.post("/create", (req, res)=>{
    postsTab.push(req.body);
    res.redirect("/posts");
})

app.post("/update/:usertitle", (req, res)=>{
    const post = postsTab.find((element) => element.usertitle === req.params.usertitle);
    if (post) {
        post.usertitle = req.body.usertitle;
        post.usertext = req.body.usertext;
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})