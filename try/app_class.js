// // import http;
// // import http from 'http';

// const http = require('http');

// const port  = 3000;
// const hostname = '127.0.0.1';

// // request handles data comming from client side
// // response handles data from server to client side
// const server = http.createServer((request, response) => {
//     response.end('<h1>Hello world</h1>');
// })

// // server.listen listens the created server
// server.listen(port, hostname, () => {
//     console.log('server started at port ', port);
// })

// const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("../model/user");

const app = express();

app.use(express.json()); // convert input from app to json format

app.get("/", async (req, res) => {
  console.log("inside get method");
  const getAllUsers = await UserSchema.find();
  res.json({ getAllUsers });
});

app.get("/findId/:id", async (req, res) => {
  try {
    console.log("inside get method");
    const id = req.params.id;
    console.log(id, "params");
    const getAllUsers = await UserSchema.find({ _id: id });
    res.status(200).json({ getAllUsers });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    console.log("inside get method");
    const id = req.params.id;
    console.log(id, "params");
    const deletedUser = await UserSchema.findByIdAndRemove({ name: id });
    if (deletedUser) {
      res.status(200).json(deletedUser);
    }
    console.log(deletedUser);
    const getAllUsers = await UserSchema.find();
    res.status(200).json({ getAllUsers });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

// app.get("/update/:id", async (req, res) => {
//   console.log("inside get method");
//   const id = req.params.id;
//   console.log(id, "params");
//   const updateUser = await UserSchema.updateOne(
//     { _id: id },
//     { name: "Person Nepali" }
//   );
//   // res.n; // Number of documents matched
//   // res.nModified; // Number of documents modified
//   // const deletedUser = await UserSchema.findByIdAndRemove({ name: id });
//   // console.log(deletedUser);
//   const getAllUsers = await UserSchema.find();
//   res.json({ getAllUsers });
// });

app.post("/signup", async (req, res) => {
  console.log(req.body, "requested body");
  const newUser = new UserSchema(req.body);

  const createdUser = await newUser.save();

  if (createdUser) {
    console.log("data saved");
    res.json({ createdUser });
  } else {
    res.json({ msg: "user not created" });
  }
});

app.patch("/update/:id", async (req, res) => {
  console.log("inside patch");
  const id = req.params.id;
  const updateUser = await UserSchema.findByIdAndUpdate(
    { _id: id },
    { $set: { name: "Series Chi" } },
    (err) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        res.json("Update Successful");
      }
    }
  );

  // const checkUser = await UserSchema.findById({ _id: id });
  // console.log(checkUser);
  // if (checkUser) {
  // } else {
  //   let errMsg = err.message;
  //   console.log(errMsg);
  //   res.json({ errMsg });
  // }
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});

const url =
  "mongodb+srv://serieschi:test@123456789@cluster0.f1trp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//   "mongodb+srv://sharan123:sharan123k@cluster0.ytgcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//   "mongodb+srv://serieschi:test@123456789@cluster0.f1trp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  url,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (error) => {
    if (error) {
      console.log("Error while connecting to database:", error.message);
    } else {
      console.log("DB connected");
    }
  }
);

// React js
// axios.post('http://localhost:3000/signup', {
//     username,
//     password,
//     phone_number,
// });

// mongodb+srv://serieschi:<password>@cluster0.f1trp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
