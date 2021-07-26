const express = require("express");
const mongoose = require("mongoose");
const SignUpSchema = require("./model/signUp");
const DashboardSchema = require("./model/dashboard");
const create = require("./crudOps");

const app = express();

app.use(express.json());

//Start of Signup
// Start of CRUD Operation
// Create Operation
app.post("/signup/create", async (req, res) => {
  console.log("inside signup");
  try {
    // console.log(SignUpSchema, "---");
    // console.log(req.body, "body");
    const createData = await create(SignUpSchema, req.body);
    // const newSignUp = new SignUpSchema(req.body);

    // const createSignUp = await newSignUp.save();

    if (createData) {
      res.status(200).json({ msg: "Sign up successful" });
    } else {
      res.status(400).json({ msg: "Sign up not successful" });
    }
  } catch {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

// Read Operation
app.get("/signup/read", async (req, res) => {
  console.log("inside read operation");
  try {
    const getAllSignupUser = await SignUpSchema.find();
    if (getAllSignupUser) {
      res.status(200).json({ getAllSignupUser });
    } else {
      res.status(200).json({ msg: "No Signups" });
    }
  } catch (error) {
    res.json({ msg: "Something Went Wrong: " + error.message });
  }
});

// Update Operation
app.patch("/signup/update/:id", async (req, res) => {
  console.log("inside update operation");
  try {
    const id = req.params.id;
    console.log(id, "indi");
    const updatedUser = await SignUpSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { phoneNumber: "98********" } }
    );

    if (updatedUser) {
      res.status(200).json({ updatedUser });
    } else {
      res.status(400).json({ msg: "Update not successful" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something Went Wrong: " + error.message });
  }
});

// Delete Operation
app.get("/signup/delete/:id", async (req, res) => {
  console.log("inside delete operation");
  try {
    const id = req.params.id;
    const deletedUser = await SignUpSchema.findByIdAndDelete({ _id: id });

    if (deletedUser) {
      res.status(200).json({ msg: "Deletion successful" });
    } else {
      res.status(400).json({ msg: "Deletion Unsuccessful" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});
// End of Signup

//Start of Dashboard
// Start of CRUD Operation
// Create Operation
app.post("/dashboard/create", async (req, res) => {
  console.log("inside create");
  try {
    const createDashboard = await create(DashboardSchema, req.body);
    // const newDashboard = new DashboardSchema(req.body);

    // const createDashboard = await newDashboard.save();

    if (createDashboard) {
      res.status(200).json({ msg: "Dashboard created successful" });
    } else {
      res.status(400).json({ msg: "Dashboard creation unsuccessful" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

// Read Operation
app.get("/dashboard/read", async (req, res) => {
  console.log("inside read operation");
  try {
    const getAllDashboardData = await DashboardSchema.find();
    if (getAllDashboardData) {
      res.status(200).json({ getAllDashboardData });
    } else {
      res.status(200).json({ msg: "No Data for dashboard" });
    }
  } catch (error) {
    res.json({ msg: "Something Went Wrong: " + error.message });
  }
});

// Update Operation
app.patch("/dashboard/update/:id", async (req, res) => {
  console.log("inside update operation");
  try {
    const id = req.params.id;
    console.log(id, "indi");
    const updatedDashboard = await DashboardSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { title: "GOLDEN ERAS" } }
    );

    if (updatedDashboard) {
      res.status(200).json({ updatedDashboard });
    } else {
      res.status(400).json({ msg: "Update not successful" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something Went Wrong: " + error.message });
  }
});

// Delete Operation
app.get("/dashboard/delete/:id", async (req, res) => {
  console.log("inside delete operation");
  try {
    const id = req.params.id;
    const deletedDashboardData = await DashboardSchema.findByIdAndDelete({
      _id: id,
    });

    if (deletedDashboardData) {
      res.status(200).json({ msg: "Deletion successful" });
    } else {
      res.status(400).json({ msg: "Deletion Unsuccessful" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});
// End of Dashboard

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
