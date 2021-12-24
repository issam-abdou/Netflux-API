"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const mongoose = require('mongoose')
//====== Define Schema and Model
const Schema = _mongoose.default.Schema; // Schema

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
  movieLanguages: [{
    title: String,
    language: String,
    overview: String
  }],
  movieVideos: {
    title: String,
    key: String,
    site: String,
    type: String
  }
}); // Model

const MovieModel = _mongoose.default.model('Movie', MovieSchema); // ======== export Model (لجعله قابل للاسدعاء من ملفات اخرى) [to make it accesibl]


var _default = MovieModel; // ======== CREATE DOCUMENTS
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

exports.default = _default;