import express from "express";
import multer from "multer";
import cors from "cors";
import 'dotenv/config';
import passport from "passport";
import {completions, completionsUsername, users, saveUserData, searchQuery}from "./controllers/controllers.js";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
} from 'passport-jwt';
const upload = multer();

const PORT = 10000;
const app = express();

const options = {
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


app.post("/completions", completions);
app.get("/completions/:username",completionsUsername);
app.get("/api/users",  users);
app.post("/api/saveUsersData", upload.none(),  saveUserData );
app.get("/api/search",  searchQuery);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });