"use strict";

// ===== IMPORT mongoose
const mongoose = require('mongoose'); // ===== CONNECT TO DB


mongoose.connect('mongodb://localhost/netflux'); //====== Define Schema and Model

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; // تحديد شكل الداتا

const BlogPostSchema = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date,
  videos: {
    title: String,
    key: String
  },
  languages: [{
    title: String,
    language: String,
    overview: String
  }]
}); // ربط شكل الداتا مع الموديل الذي هو كوليكشن داخل الداتابيز
// here we say that there is a colloction with name of "Blog"
// "Blog" is a model that use this Schema of data

const BlogPostModel = mongoose.model('Blog', BlogPostSchema); // ======== CREATE DOCUMENTS
//- create model 01

const examplePost1 = new BlogPostModel({
  titel: "title 06",
  body: "body 06 ...",
  date: new Date(),
  videos: {
    title: "video 6",
    key: "key 6"
  },
  languages: [{
    title: "title 6",
    language: "ar 6",
    overview: "overview 6"
  }]
}); //- create model 02

const examplePost2 = new BlogPostModel();
examplePost2.titel = "title 04";
examplePost2.body = "body 04 ...";
examplePost2.date = new Date(); // ======= SAVE DOCUMENTS
//- save model 01

examplePost1.save(function () {
  console.log("All good for POST 01 !!");
}); //- save model 2

examplePost2.save(function () {
  console.log('All good for Post 2 !!');
});