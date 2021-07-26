const express = require("express");

const router = express.Router();

const DashboardSchema = require("../model/dashboard");
const crud = require("../functions/crudOps");

router.post("/create", async (req, res) => {
  console.log("here");
  console.log("inside signup");
  try {
    const createData = await crud.create(DashboardSchema, req.body);

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
    console.log("inside read");
    const readData = await crud.read(DashboardSchema);

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
    let param = req.params.id;
    data = { description: "Updated Data" };
    const updateData = await crud.update(DashboardSchema, param, data);

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
    const deleteData = await crud.destroy(DashboardSchema, param);

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
