const express = require("express");
const departmentController = require("../controllers/deparmentController");

const departmentRouter = express.Router();

// Create Operation
router.post("/", () => console.log('create department'));

// Read operations
router.get("/", () => console.log('get all departments'));
router.get("/:id", () => console.log('get department (staff)'));

// Update operation
router.put("/:id", () => console.log('update staff '));

// Delete operation
router.delete("/:id", () => console.log('remove department from db'));



module.exports = departmentRouter;