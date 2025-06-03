"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var auth_1 = require("firebase/auth");
var firebaseConfig = {
    apiKey: "AIzaSyD0f-epIqdx5eYBFDwv4XStSr3AIRspFbs",
    authDomain: "devlinks-42cbf.firebaseapp.com",
    projectId: "devlinks-42cbf",
    storageBucket: "devlinks-42cbf.firebasestorage.app",
    messagingSenderId: "860398063936",
    appId: "1:860398063936:web:989bb52feceb345b5b6aa5"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
