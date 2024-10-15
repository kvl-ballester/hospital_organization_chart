const express = require("express");
const {employeeController} = require("../controllers/employeeController");

const employeeRouter = express.Router();

// Create Operation
employeeRouter.post("/", employeeController.createEmployee);

// Read operations
employeeRouter.get("/", employeeController.getAllEmployees);
employeeRouter.get("/:id", employeeController.getEmployeeById);

// Update operation
employeeRouter.put("/:id", employeeController.updateEmployee);

// Delete operation
employeeRouter.delete("/:id", employeeController.removeEmployee);



module.exports = employeeRouter;