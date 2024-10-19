const Department = require('../models/department')
const Employee = require('../models/employee')
const {logAPICall, logPrivateFunction} = require('../helpers/helpers')
const CustomError = require('../helpers/customErrorClass')

departmentController = {

    createDepartment: async (req, res) => {
        logAPICall(req, departmentController.createDepartment.name)

        try {
            const departmentDoc = new Department({
                name: req.body.name,
                staff: []
            })
            const savedDoc = await departmentDoc.save()
            res.json(savedDoc)

        } catch (error) {
            res.status(400).send(error)
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

            if (!department) throw new CustomError('Department not found', 404)
            res.json(department)

        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).send(error.message)
        }
    },

    removeDepartment: async (req, res) => {
        logAPICall(req, departmentController.removeDepartment.name)
        const departmentId = req.params.id

        try {
            const department = await Department.findById(departmentId)
            if (!department) {
                throw new CustomError(`Department not found for id: ${departmentId}` , 404);
                
            }

            //Update employee model if needed
            if (department.staff.length != 0) {
                await removeDepartmentFromEmployee(department.staff)
            }
            
            const infoOp = await Department.deleteOne({_id: departmentId})
            if (infoOp.deletedCount != 1) {
                throw new Error("An error ocurred while deleting department");
            }
            

            res.sendStatus(200)
        } catch (error) {
            res.status(error.statusCode || 500).send(error.message)
            console.log(error)
        } 
    }



}

async function addEmployeeToDepartment(employee) {
    logPrivateFunction(addEmployeeToDepartment.name, employee)

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
    logPrivateFunction(removeEmployeeFromDepartment.name, employee)
    
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


async function removeDepartmentFromEmployee(departmentStaff) {
    logPrivateFunction(removeDepartmentFromEmployee.name, departmentStaff)

    try {
        
        //update department field
        for (const employeeRef of departmentStaff) {
            let infoOp = await Employee.updateOne(
                {_id: employeeRef._id},
                {$set:
                    {department: ''}
                }
            )

            if (infoOp.modifiedCount != 1) {
                throw new CustomError(`Error updating employee profile from staff, id: ${employeeRef._id}`, 400);
                
            }
        }
    } catch (error) {
        throw error
    }
    
}



module.exports = {departmentController, removeEmployeeFromDepartment, addEmployeeToDepartment}