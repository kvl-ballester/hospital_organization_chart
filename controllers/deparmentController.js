const Department = require('../models/department')
const Employee = require('../models/employee')
const {logAPICall, logPrivateFunction, logWarning} = require('../helpers/helpers')
const CustomError = require('../helpers/customErrorClass')
const Logger = require('../helpers/logger')

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
            res.status(error.statusCode || 500).send(error.message)
            Logger.log(error)
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
            Logger.log(error)
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
            Logger.log(error)
        } 
    }



}


async function addEmployeeToDepartmentStaff(employee) {
    logPrivateFunction(addEmployeeToDepartmentStaff.name, employee)

    try {

        const [department] = await Department.find({name: employee.department})
        let res = {}

        if (isEmployeeInStaff(employee._id, department.staff)) {
            logWarning(`Employee ${employee._id} is already in department ${employee.department}.`)
        } else {
            const data= {
                _id: employee._id,
                fullname: employee.name + ' ' + employee.surname
            }
    
            const infoOp = await Department.updateOne(
                {name: employee.department},
                {$push: 
                    {staff: data}
                }
            )

            res = infoOp
        }
        

        return res
    } catch (error) {
        throw error
    }
    
}

async function removeEmployeeFromDepartmentStaff(employee) {
    logPrivateFunction(removeEmployeeFromDepartmentStaff.name, employee)
    
    try {
        const [department] = await Department.find({name: employee.department})
        let res = {}

        if (!department) {
            logWarning(`No need to remove employee from staff, department ${employee.department} does not exist.`)
        } else if (!isEmployeeInStaff(employee._id, department.staff)){
            logWarning(`Employee ${employee._id} is not already in staff from department ${employee.department}`)

        } else {

            const infoOp = await Department.updateOne(
                {name: employee.department},
                {$pull:
                    {
                        staff: {_id: employee._id}
                    }
                }
            )

            res = infoOp
        }

        return res

    } catch (error) {
        throw error
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
                throw new Error(`Error updating employee profile from staff, id: ${employeeRef._id}`);
                
            }
        }
    } catch (error) {
        throw error
    }
    
}

function isEmployeeInStaff(employeeId, staff) {
    const res = staff.filter((obj) => obj._id.equals(employeeId))
    if (res.length === 0) return false
    return true
}



module.exports = {departmentController, removeEmployeeFromDepartmentStaff, addEmployeeToDepartmentStaff}