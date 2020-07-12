// DEPENDANCIES
const express = require("express");
const path = require("path");
const fs = require("fs");

// CREATE SERVER
const app = express();

// INITIAL PORT
const PORT = process.env.PORT || 3000;

//  NOTE ARRAY

let noteArr = [];

// DATA PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//uses css
app.use(express.static(path.join(__dirname, "Develop/public")));

// ROUTER

