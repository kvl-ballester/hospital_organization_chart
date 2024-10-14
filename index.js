const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const employeeRouter = require("./routes/employee");
const departmentRouter = require("./routes/department");

dotenv.config();

const port = process.env.PORT || 8089;
const app = express();
connectDB()

// parse application/json
app.use(bodyParser.json())
//app endpoints
app.use("/api/employee", employeeRouter);
app.use("/api/department", departmentRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });