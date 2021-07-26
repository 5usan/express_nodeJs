const express = require("express");
const mongoose = require("mongoose");
const SignUpSchema = require("./model/signUp");
const DashboardSchema = require("./model/dashboard");
const create = require("./functions/crudOps");
const Signup = require("./routes/signup");
const Dashboard = require("./routes/dashboard");

const app = express();

app.use(express.json());

app.use("/signup", Signup);

app.use("/dashboard", Dashboard);

app.listen(3000, () => {
  console.log("server started at prot 3000");
});

const url =
  "mongodb+srv://serieschi:test@123456789@cluster0.f1trp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
      console.log("Error while connecting to database: ", error.message);
    } else {
      console.log("DB Connected");
    }
  }
);
