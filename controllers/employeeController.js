const CustomError = require('../helpers/customErrorClass')
const { logAPICall } = require('../helpers/helpers')
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
            
            const savedDoc = await employee.save()
            await addEmployeeToDepartmentStaff(employee)
            res.json(savedDoc)

        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            console.log(error)            
        }

    },

    getAllEmployees: async (req, res) => {
        logAPICall(req, employeeController.getAllEmployees.name)

        try {
            const employees = await Employee.find()
            res.json(employees)
        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            console.log(error)    
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
            console.log(error)  
        }
    },

    updateEmployee: async (req, res) => {
        logAPICall(req, employeeController.updateEmployee.name)
        
        const data = req.body
        data._id = req.params.id

        try {
            const employee = await Employee.findById(req.params.id)
            if (!employee) throw new CustomError("Employee not found", 404)

            // update departmetns staff
            await removeEmployeeFromDepartmentStaff(employee)
            await addEmployeeToDepartmentStaff(data)
            await updateEmployee(data)

            res.sendStatus(200)

        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            console.log(error) 
        }
        
    },

    removeEmployee: async (req, res) => {
        logAPICall(req, employeeController.removeEmployee.name)

        try {
            const employee = await Employee.findById(req.params.id)
            if (!employee) throw new CustomError("Employee not found", 404)

            await removeEmployeeFromDepartmentStaff(employee)
            await deleteEmployee(req.params.id)

            res.sendStatus(200)
        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            console.log(error) 
        }
    }

}



async function updateEmployee(data) {

    try {
        const infoOp = await Employee.updateOne({_id: data.id}, data)
        if (infoOp.modifiedCount != 1) {
            throw new Error("Error occured updating employee info");
            
        } 

        return infoOp

    } catch (error) {
        throw error
    }
    
}

async function deleteEmployee(id) {
    try {
        const infoOp = await Employee.deleteOne({_id: req.params.id})
        if (infoOp.deletedCount != 1) {
            throw new Error("An error ocurred while deleting employee");
        }

        return infoOp

    } catch (error) {
        throw error;
        
    }
    
}

module.exports = {employeeController}