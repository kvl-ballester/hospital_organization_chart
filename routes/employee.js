const express = require("express");
const employeeController = require("../controllers/employeeController");

const employeeRouter = express.Router();

// Create Operation
router.post("/", () => console.log('create employee'));

// Read operations
router.get("/", () => console.log('get all employees'));
router.get("/:id", () => console.log('get employee by id'));

// Update operation
router.put("/:id", () => console.log('update employee info'));

// Delete operation
router.delete("/:id", () => console.log('remove employee from db'));



module.exports = employeeRouter;