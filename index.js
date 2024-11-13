const express=require("express");
const app=express();
const port =3000;
const path = require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override")

app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
let posts=[
    {
        id:uuidv4(),
        username:"Bhushan",
        content: "I m Coder"
    },
    {
        id:uuidv4(),
        username:"Nisarg",
        content: "I m IIITian"
    },
    {
        id:uuidv4(),
        username:"Rohan",
        content: "I m Wrestler"
    }  

];
//home
app.get("/",(req,res)=>{
    res.send("server is working");
});
// get route: to get data for all post 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

//post route: to send new post 
app.post("/posts",(req,res)=>{
    let {id,username,content}=req.body;
    console.log({id});
    posts.push({username,content});
    res.redirect("/posts");
});

// implement /post/:id show route

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); 
    res.render("show.ejs",{post});
});

//update route using patch request

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post = posts.find((p) => id === p.id); 
    post.content=newContent;
    res.redirect("/posts");
})

//Edit route put request usind (methode-override) 

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});

})


app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");

});



app.listen(port,(req,res)=>{
    console.log("Server is listening on port : ",port);
});
