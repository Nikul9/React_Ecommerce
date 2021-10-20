var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-service-account-Key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin