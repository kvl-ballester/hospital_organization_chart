const Department = require('../models/department')
const Employee = require('../models/employee')
const {logAPICall} = require('../helpers/helpers')

departmentController = {

    createDepartment: async (req, res) => {
        logAPICall(req, departmentController.createDepartment.name)

        try {
            const departmentDoc = new Department({
                name: req.body.name,
                staff: []
            })

            const savedDoc = await departmentDoc.save()
            console.log(new Date(Date.now()).toLocaleString() + ' Department created: name = ' + req.body.name + ', id = ' + savedDoc._id)
            res.json(savedDoc)

        } catch (error) {
            res.status(400).send(error)
            console.log('createDepartment Error:')
            console.log(error)
        }
        
    },

    getAllDepartments: async (req, res) => {
        logAPICall(req, departmentController.getAllDepartments.name)
        const departments = await Department.find()
        res.json(departments)
    },

    getDepartmentById: async (req,res) => {
        logAPICall(req, departmentController.getDepartmentById.name)
        
        try {
            const department = await Department.findById(req.params.id)

            if (department == null) throw new Error("Department not found")
                            
            res.json(department)

        } catch (error) {
        
            res.status(400).send(error)
            console.log('getDepartmentById Error:')
            console.log(error)
        }
    },

    removeDepartment: async (req, res) => {
        logAPICall(req, departmentController.removeDepartment.name)

        try {
            const department = await Department.findById(req.params.id)
            for (const employeeRef of department.staff) {
                await Employee.updateOne(
                    {_id: employeeRef._id},
                    {$set:
                        {department: ''}
                    }
                )
            }

            const deletedDoc = await Department.deleteOne({_id: req.params.id})
            res.json(deletedDoc)
        } catch (error) {
            res.status(400).send(error)
            console.log('removeDepartment Error:')
            console.log(error)
        }
    }



}

async function addEmployeeToDepartment(employee) {
    console.log(new Date(Date.now()).toLocaleString(), '@' + addEmployeeToDepartment.name)
    
    try {
        await Department.updateOne(
            {name: employee.department},
            {$push: 
                {staff: {
                    _id: employee._id,
                    fullname: employee.name + ' ' + employee.surname
                }}
            }
        )
    } catch (error) {
        console.log('addEmployeeToDepartment Error:')
        console.log(error)
    }
    
}

async function removeEmployeeFromDepartment(employee) {
    console.log(new Date(Date.now()).toLocaleString(), '@' + removeEmployeeFromDepartment.name)
    
    try {
        await Department.updateOne(
            {name: employee.department},
            {$pull:
                {
                    staff: {_id: employee._id}
                }
            }
        )
    } catch (error) {
        console.log('removeEmployeeFromDepartment Error:')
        console.log(error)
    }
    
}



module.exports = {departmentController, removeEmployeeFromDepartment, addEmployeeToDepartment}