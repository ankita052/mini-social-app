const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* =========================
   USER MODEL
========================= */
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

/* =========================
   POST MODEL
========================= */
const postSchema = new mongoose.Schema({
  text: String,
  image: String, // ✅ ADD THIS
  likes: { type: Array, default: [] },
  comments: { type: Array, default: [] }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

/* =========================
   AUTH ROUTES
========================= */

// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json("Registered successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, "secret123");

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    app.get("/", (req, res) => {
  res.send("API Running");
});


  } catch (err) {
    res.status(500).json("Server error");
  }
});

/* =========================
   POST ROUTES
========================= */

// Create Post
app.post("/posts", async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json("Text or Image required");
    }

    const post = new Post({
      text,
      image
    });

    const saved = await post.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json("Error creating post");
  }
});

// Get Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error fetching posts");
  }
});

// Like Post
app.put("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("Post not found");

    if (post.likes.length === 0) {
      post.likes.push("user");
    } else {
      post.likes = [];
    }

    await post.save();
    res.json(post);
  } catch {
    res.status(500).json("Error liking post");
  }
});

// Comment
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json("Post not found");

    post.comments.push(req.body.text);
    await post.save();

    res.json(post);
  } catch {
    res.status(500).json("Error commenting");
  }
});

/* =========================
   START SERVER
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
