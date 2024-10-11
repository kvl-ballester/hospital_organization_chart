const express = require("express");
const departmentController = require("../controllers/deparmentController");

const departmentRouter = express.Router();

// Create Operation
departmentRouter.post("/", () => console.log('create department'));

// Read operations
departmentRouter.get("/", () => console.log('get all departments'));
departmentRouter.get("/:id", () => console.log('get department (staff)'));

// Update operation
departmentRouter.put("/:id", () => console.log('update staff '));

// Delete operation
departmentRouter.delete("/:id", () => console.log('remove department from db'));



module.exports = departmentRouter;