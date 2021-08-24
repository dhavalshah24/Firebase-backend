const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');

const config = require("./config");
 
const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
