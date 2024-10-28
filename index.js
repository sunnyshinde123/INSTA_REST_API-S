const express=require("express");

const app=express();

const port=4040;

const path=require("path");

let methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public/CSS")));

app.use(express.static(path.join(__dirname,"images")));
app.use(express.urlencoded({extended:true}));

app.use(express.json());

const { v4: uuidv4 } = require('uuid');

const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;

let posts=[
    {
        id:uuidv4(),
        username:"sunny_shinde",
        img:"/jocke-wulcan-KLOW1bD616Y-unsplash.jpg",
        caption:"Feeling Well!!!"

    },
    {
        id:uuidv4(),
        username:"abhi_09",
        img:"/tembinkosi-sikupela-ZC3iqcOL5T8-unsplash.jpg",
        caption:"Feeling Well!!!"
    }
]

app.listen(port, ()=>{
    console.log(`listening request to ${port}`);
})

app.get("/posts",(req, res)=>{
    res.render("index.ejs",{posts, BASE_URL});
})

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req, res)=>{
    let{username, img, caption}=req.body;
    let id=uuidv4();
    posts.push({id, username, img, caption});
    res.redirect("${BASE_URL}/posts");
})

app.get("/posts/:id",(req, res)=>{
    let{id}=req.params;
    let postId=posts.find((p)=> id===p.id);
    res.render("view.ejs",{postId, posts});
})

app.get("/posts/:id/edit",(req, res)=>{
    let {id}=req.params;
    let postId=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{postId});
})

app.patch("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let newCaption=req.body.caption;
    let newImg=req.body.img;
    let postId=posts.find((p)=> id===p.id);
    postId.img=newImg;
    postId.caption=newCaption;
    res.redirect("${BASE_URL}/posts");
})

app.delete("/posts/:id",(req, res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!=p.id);
    res.redirect("${BASE_URL}/posts");
})
