const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const Logger = require('./helpers/logger')
const bodyParser = require('body-parser')
const employeeRouter = require("./routes/employee");
const departmentRouter = require("./routes/department");
var cors = require('cors')



// Configuration
dotenv.config();
Logger.initialize('logs/app.log');
const port = process.env.PORT || 8089;
const app = express();
connectDB()

app.use(cors())
// parse application/json
app.use(bodyParser.json())
//app endpoints
app.use("/api/employee", employeeRouter);
app.use("/api/department", departmentRouter);

app.listen(port, () => {
  Logger.log(`[api_server] Server listening at http://localhost:${port}`)
});