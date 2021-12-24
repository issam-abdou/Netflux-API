
import express from "express";
import MovieModel from "./Models/Movie.js";
import mongoose from "mongoose" // because we make the connection to the DB here in this file
import steupRoutes from './routes.js'
import bodyParser from "body-parser" // To parse the POST request

// ########## using async/await ############

const start = async() =>{
    try {
        await mongoose.connect('mongodb://localhost/netflux');
        console.log("let's create an app");
        const app = express()
        // Use bodyParser in our App to parse every POST requeste
        app.use(bodyParser.urlencoded({extended: true})) 

        console.log("app is created");
        steupRoutes(app);

        console.log("let's listen to the server");
        const port = 6200;
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
} 

start();


