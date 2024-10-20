const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    immutable: true
  },
  staff: {
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      fullname: String
    }],
    required: true,
  },
});


const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;