const CustomError = require('../helpers/customErrorClass')
const { logAPICall } = require('../helpers/helpers')
const Logger = require('../helpers/logger')
const Department = require('../models/department')
const Employee = require('../models/employee')
const {addEmployeeToDepartmentStaff, removeEmployeeFromDepartmentStaff} =  require('./deparmentController')


employeeController = {

    createEmployee: async (req, res) => {
        logAPICall(req, employeeController.createEmployee.name)

        const employee =  new Employee({
            name: req.body.name,
            surname: req.body.surname,
            department: req.body.department
        })

        try {

            const [department] = await Department.find({name: employee.department})
            if (!department) throw new CustomError(`Department ${employee.department} does not exist`, 400)
            
            const savedDoc = await employee.save()
            await addEmployeeToDepartmentStaff(employee)
            res.json(savedDoc)

        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error)            
        }

    },

    getAllEmployees: async (req, res) => {
        logAPICall(req, employeeController.getAllEmployees.name)

        try {
            const employees = await Employee.find()
            res.json(employees)
        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error)    
        }
        
    },

    getEmployeeById: async (req,res) => {
        logAPICall(req, employeeController.getEmployeeById.name)
        try {
            const employee = await Employee.findById(req.params.id)

            if (!employee) throw new CustomError("Employee not found", 404)
            res.json(employee)

        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error)  
        }
    },

    updateEmployee: async (req, res) => {
        logAPICall(req, employeeController.updateEmployee.name)
        

        try {
            const employee = await Employee.findById(req.params.id)
            if (!employee) throw new CustomError("Employee not found", 404)
            
            const [department] = await Department.find({name: req.body.department})
            if (!department) throw new CustomError(`Department ${req.body.department} does not exist`, 400)
            
            // new data
            const data =  new Employee({
                _id: req.params.id,
                name: req.body.name,
                surname: req.body.surname,
                department: req.body.department
            })
            // update departmetns staff
            await removeEmployeeFromDepartmentStaff(employee)
            await addEmployeeToDepartmentStaff(data)
            await Employee.updateOne({_id: data._id}, data)

            res.sendStatus(200)

        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error) 
        }
        
    },

    removeEmployee: async (req, res) => {
        logAPICall(req, employeeController.removeEmployee.name)

        try {
            const employee = await Employee.findById(req.params.id)
            if (!employee) throw new CustomError("Employee not found", 404)

            await removeEmployeeFromDepartmentStaff(employee)
            await Employee.deleteOne({_id: req.params.id})

            res.sendStatus(200)
        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error) 
        }
    }

}


module.exports = {employeeController}