// firebaseAdmin.js
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ✅ Update path below to match the actual filename
const serviceAccount = require("./crowd-spark.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;