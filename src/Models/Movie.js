
// const mongoose = require('mongoose')
import mongoose from "mongoose"

//====== Define Schema and Model
const Schema = mongoose.Schema;

// Schema
const MovieSchema = new Schema({
    originalTitle: String,
    originalOverview: String,
    posterPath: String,
    backdropPath: String,
    popularity: Number,
    voteAverage: Number,
    releaseDate: String,
    genres: [String],
    category: String,
    language: String,
    movieLanguages: [
        {
            title: String,
            language: String,
            overview: String       
        }
    ],
    movieVideos: {
        title: String,
        key : String,
        site: String,
        type: String
    }
});
// Model
const MovieModel = mongoose.model('Movie', MovieSchema);

// ======== export Model (لجعله قابل للاسدعاء من ملفات اخرى) [to make it accesibl]
export default MovieModel;

// ======== CREATE DOCUMENTS


///////////// MY TRY ////////////////
/*
// CONNECT TO DB

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/netflux")

// DEFINE SCHEMA + MODELS
const Schema = mongoose.Schema;
// -- schema
const MovieSchema = new Schema ({
    originalTitle: String,
    originalOverview: String,
    posterPath: String,
    backdropPath: String,
    popularity: Number,
    voteAverage: Number,
    releaseDate: String,
    genres: [String],
    category: String,
    language: String,
    movieLanguages: [
        {
            title: String,
            language: String,
            overview: String       
        }
    ],
    movieVideos: {
        title: String,
        key : String,
        site: String,
        type: String
    }
})
//-- model
const MovieModel = mongoose.model('Movie',MovieSchema);

// ===== EXPORT MODEL
export default MovieModel;
*/