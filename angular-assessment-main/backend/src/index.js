import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };
import {
  bookmarkVideo,
  getBookmarksForVideo,
  getVideos,
  putVideo,
} from "./videosController.js";
import { users } from "./getDatabase.js";

const app = express();
const secret = "secret-key";

// middleware to parse JSON data
app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.substring(7);
  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, name } = req.body;
  const user = users.find({ username });

  if (user) {
    return res.status(403).json({
      message: "User already exists",
    });
  }
  users.insert({
    username,
    password,
    name,
  });
  return res.status(200).json({
    message: "User created successfully",
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find({ username });
  if (user && user.password === password) {
    const token = jwt.sign({ username, name: user.name }, secret);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.get("/api/videos", authenticate, getVideos);
app.post("/api/videos", authenticate, putVideo);
app.get("/api/videos/bookmarks/:videoId", authenticate, getBookmarksForVideo);
app.post("/api/videos/bookmarks/:videoId", authenticate, bookmarkVideo);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
