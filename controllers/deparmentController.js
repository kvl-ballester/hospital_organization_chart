const Department = require('../models/department')
const Employee = require('../models/employee')


departmentController = {

    createDepartment: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' createDepartment: name = ' + req.body.name)

        try {
            const departmentDoc = new Department({
                name: req.body.name,
                staff: []
            })

            const savedDoc = await departmentDoc.save()
            res.json(savedDoc)

        } catch (error) {
            res.status(400).send(error)
            console.log('createDepartment Error:')
            console.log(error)
        }
        


    },

    getAllDepartments: async (req, res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' getAllDepartments')
        const departments = await Department.find()
        res.json(departments)
    },

    getDepartmentById: async (req,res) => {
        console.log(new Date(Date.now()).toLocaleString() + ' getDepartmentById: id = ' + req.params.id)
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
        console.log(new Date(Date.now()).toLocaleString() + ' removeDepartment: id = ' + req.params.id)

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

async function removeEmployeeFromDepartment(departmentName, idEmployee) {
    try {
        await Department.updateOne(
            {name: departmentName},
            {$pull:
                {
                    staff: {_id: idEmployee}
                }
            }
        )
    } catch (error) {
        console.log('removeEmployeeFromDepartment Error:')
        console.log(error)
    }
    
}



module.exports = {departmentController, removeEmployeeFromDepartment, addEmployeeToDepartment}