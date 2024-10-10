const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staff: {
    type: [{
        fullname: {type: String, required: true}
    }],
    required: true,
  },
});


const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;