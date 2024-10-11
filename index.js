const express = require("express");
const dotenv = require("dotenv");

const employeeRouter = require("./routes/employee");
const departmentRouter = require("./routes/department");

dotenv.config();

const port = process.env.PORT || 8089;
const app = express();

app.use("/api/employee", employeeRouter);
app.use("/api/department", departmentRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });