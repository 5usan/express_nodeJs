const express = require("express");

const SignUpSchema = require("../model/signUp");

const router = express.Router();
const { create, read, update, destroy } = require("../functions/crudOps");

router.post("/create", async (req, res) => {
  console.log("here");
  console.log("inside signup");
  try {
    const createData = await create(SignUpSchema, req.body);

    if (createData) {
      res.status(200).json({ msg: "Sign up successful" });
    } else {
      res.status(400).json({ msg: "Sign up not successful" });
    }
  } catch {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

router.get("/read", async (req, res) => {
  try {
    const readData = await read(SignUpSchema);

    if (readData) {
      res.status(200).json(readData);
    } else {
      res.status(400).json({ msg: "Could not read or empty table" });
    }
  } catch {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    let { phoneNumber, userName, name, address, password } = req.body;
    let data = { phoneNumber: phoneNumber };
    let param = req.params.id;
    const updateData = await update(SignUpSchema, param, data);

    if (updateData) {
      res.status(200).json(updateData);
    } else {
      res.status(400).json({ msg: "Update not successful" });
    }
  } catch {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    let param = req.params.id;
    console.log(param);
    const deleteData = await destroy(SignUpSchema, param);

    if (deleteData) {
      res.status(200).json(deleteData);
    } else {
      res.status(400).json({ msg: "Delete not successful" });
    }
  } catch {
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

module.exports = router;
