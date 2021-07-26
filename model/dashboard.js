const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
