const Employee = require('../models/employee')
const {addEmployeeToDepartment, removeEmployeeFromDepartment} =  require('./deparmentController')
employeeController = {

    createEmployee: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' createEmployee: name = ' + req.body.name 
        + ', surname = ' + req.body.surname + ', department = ' + req.body.department)

        const employee =  new Employee({
            name: req.body.name,
            surname: req.body.surname,
            department: req.body.department
        })

        try {
            const savedDoc = await employee.save()
            console.log(new Date(Date.now()).toLocaleString() + ' employee created: name = ' + savedDoc.name + ', id = ' + savedDoc._id) 
            await addEmployeeToDepartment(savedDoc)
            res.json(savedDoc)

        } catch (error) {
            console.log('createEmployee error \n', error)
        }

    },

    getAllEmployees: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' getAllEmployees')

        try {
            const employees = await Employee.find()
            res.json(employees)
        } catch (error) {
            console.log('getAllEmployees error \n', error)
        }
        
    },

    getEmployeeById: async (req,res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' getEmployeeById: id = ' + req.params.id)
        try {
            const employee = await Employee.findById(req.params.id)

            if (employee == null) throw new Error("Employee not found")
                            
            res.json(employee)

        } catch (error) {
            res.status(400).send(error)
            console.log('getEmployeeById Error: \n',error)
        }
    },

    updateEmployee: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' updateEmployee: id = ' + req.params.id)
        
        const data = req.body
        data._id = req.params.id

        const employee = await Employee.findById(req.params.id)
        
        // update departmetns staff
        await removeEmployeeFromDepartment(employee)
        await addEmployeeToDepartment(data)
        
        const updatedDoc = await Employee.updateOne({_id: req.params.id}, data)
        res.json(updatedDoc)
    },

    removeEmployee: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' removeEmployee: id = ' + req.params.id)

        try {
            const employee = await Employee.findById(req.params.id)
            
            const deletedDoc = await Employee.deleteOne({_id: req.params.id})
            await removeEmployeeFromDepartment(employee)
            res.json(deletedDoc)
        } catch (error) {
            res.status(400).send(error)
            console.log('removeDepartment Error:')
            console.log(error)
        }
    }

}

module.exports = {employeeController}