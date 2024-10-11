const express = require("express");
const employeeController = require("../controllers/employeeController");

const employeeRouter = express.Router();

// Create Operation
employeeRouter.post("/", () => console.log('create employee'));

// Read operations
employeeRouter.get("/", () => console.log('get all employees'));
employeeRouter.get("/:id", () => console.log('get employee by id'));

// Update operation
employeeRouter.put("/:id", () => console.log('update employee info'));

// Delete operation
employeeRouter.delete("/:id", () => console.log('remove employee from db'));



module.exports = employeeRouter;