const express = require("express");
const {departmentController} = require("../controllers/deparmentController");

const departmentRouter = express.Router();

// Create Operation
departmentRouter.post("/", departmentController.createDepartment);

// Read operations
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.get("/:id", departmentController.getDepartmentById);

// Delete operation
departmentRouter.delete("/:id", departmentController.removeDepartment);



module.exports = departmentRouter;