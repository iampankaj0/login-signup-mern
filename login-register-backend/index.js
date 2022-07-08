import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// User Model Create After User Schema
const User = new mongoose.model("User", userSchema);

// Routes
// Login Route
app.post("/login", (req, res) => {
  // res.send("My Api login");
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Successfully Login", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

// Register Route
app.post("/register", (req, res) => {
  //   res.send("My Api Register");
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist, Please login with same email" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Sucessfully Registerd, Please login now" });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("Be started at port 9002");
});
