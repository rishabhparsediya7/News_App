const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const templatePath = path.join(__dirname + "/../views");
const staticPath = path.join(__dirname + "/../public");
const Register = require("../models/registers");
require("../models/conn");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        console.log('reaching here');
        if (password === cpassword) {
            const registerUser = new Register({
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                email: req.body.email
            })
            const registered = await registerUser.save();
            res.render("index");
            // res.send(registerUser.JSON.stringify());
        } else {
            res.send("password is not matching");
        }
    } catch (err) {
        res.status(400).send("hii" + err);
    }
})
app.get("/login", (req, res) => {
    res.render("index");
})
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({ email: email });
        console.log(email + "" + password);
        if (userEmail.password === password) {
            var url = 'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
            const news_get = await axios.get(url)
            console.log(news_get.data.articles[0]);
            const onenews = news_get.data.articles;
            res.render("news", { data: onenews });
        } else {
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send("This email is not registered yet")
    }
});
app.get('/technology', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        var url = require('url');
        var adr = req.protocol + '://' + req.get('host') + req.originalUrl;
        var q = url.parse(adr, true);
        const pathName = q.pathname;
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.get('/sports', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.get('/food', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.get('/health', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/everything?q=health&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.get('/politics', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/everything?q=politics&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.get('/entertainment', async(req, res) => {
    try {
        var url = 'https://newsapi.org/v2/everything?q=entertainment&apiKey=a5019630031c456b9ffc17f9ab1c3ada';
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error)
        }
    }
})
app.post('/search', async(req, res) => {
    try {
        const key = req.body.search;
        var url = `https://newsapi.org/v2/everything?q=${key}&apiKey=a5019630031c456b9ffc17f9ab1c3ada`;
        const news_get = await axios.get(url)
        console.log(news_get.data.articles[0]);
        const onenews = news_get.data.articles;

        const entries = Object.entries(onenews);
        console.log(typeof entries);
        console.log(entries.length);
        if (entries.length <= 0)
            res.render("news", { image: "./sorry1.jpg" });
        res.render("news", { data: onenews });
    } catch (error) {
        if (error.response) {
            console.log(error);
        }
    }
})

app.listen(port, () => {
    console.log(`app is listening at ${port}`);
})