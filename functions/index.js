const functions = require("firebase-functions");
const app = require("./server");

exports.handler = functions.https.onRequest(app);
