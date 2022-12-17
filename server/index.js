import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

// const express = require("express")

const app = express()
dotenv.config()

// const bodyParser = require('body-parser')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
        console.log("Connected to DB")
        })
        .catch((err) => {
            throw err;
        });
};

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Somenthing went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/register', function(req, res) {
    res.render('register')
})

app.post('/register', function(req, res) {
    res.send(req.body)
})

app.listen(8800, ()=> {
    connect()
    console.log("Connected to Server")
})