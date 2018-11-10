const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;
let app = express();

const fs = require("fs");
hbs.registerPartials(__dirname+"/views/partial");
hbs.registerHelper("GetYeer",()=>{
    return new Date().getFullYear();
})
hbs.registerHelper("screamit",(text)=>{
    return text.toUpperCase();
})
app.set("view engine","hbs");

app.use((req,res,next)=>{
    let now = new Date().toString();
     let log = now+req.method+req.url;
     fs.appendFile("server.log",log +"\n",(error)=>{if(error)console.log(error)});
    next();
})

// app.use((req,res,next)=>{    
//      res.render("maintenance.hbs",{
//         pagetitle:"maintenance",
//     })
     
// })
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
        // res.send("<h1>hi there</h1>");
        res.render("home.hbs",{
            pagetitle:"HOME",
            welcomeMass:"Hi from home",
            projectName:"Learning Node"
        })
})
app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pagetitle:"about from about",
    })
});
app.get("/project",(req,res)=>{
    res.render("project.hbs",{
        projectName:"Learning Node"
     })
})
app.get("/bad",(req,res)=>{
    res.send({
        errorms:"khaled"
    });
});
app.listen(port,()=>{
    console.log("server in port ",port);
});