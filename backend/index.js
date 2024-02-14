import express from "express";
import multer from "multer";
import cors from "cors";
import 'dotenv/config';
import passport from "passport";
import {completions, completionsUserId, users, saveUserData, searchQuery}from "./controllers/controllers.js";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer();

const PORT = 3000;
const app = express();

const options = {
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}
app.use(express.json());
app.use(cors());
app.use(passport.initialize());



app.post("/completions", completions);
app.get("/completions/:user_id",completionsUserId);
app.get("/api/users",  users);
app.post("/api/saveUsersData", upload.none(),  saveUserData );
app.get("/api/search",  searchQuery);


// frontend build file api for show data data on backend browser  
const buildPath = join(__dirname, '../frontend', 'build');
app.use(express.static(buildPath));
app.get('*', (req, res) => {
  res.sendFile(join(buildPath, 'index.html'));
});
// end this api 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });