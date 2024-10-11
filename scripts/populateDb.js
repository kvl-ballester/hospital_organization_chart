const mongoose = require('mongoose');
const data = require('./data')
const dotenv = require("dotenv");
const Department = require('../models/department')
const Employee = require('../models/employee')

dotenv.config();

async function connectTo(uri) {
    try {
        await mongoose.connect(uri);
        console.log('Connected to ' + uri)
      } catch (error) {
        console.log(error);
      }
}

async function createDepartments() {
    for (const departmentDoc of data.departments) {
        const savedDoc = await departmentDoc.save()
        console.log('Department ' + savedDoc.name + ' created!')
    }
}

async function createStuff(departments) {
    const departmentNames = departments.map(obj => obj.name)
    for (const person of data.people) {
        let randomDepartmentIndex = Math.floor(Math.random() * departmentNames.length)
        let departmentChosen = departmentNames[randomDepartmentIndex]

        const employeeDoc = new Employee({
            name: person.name,
            surname: person.surname,
            department: departmentChosen
        })

        try {
            // Create employee file
            const savedDoc = await employeeDoc.save()
            // Add employee to department
            await Department.updateOne(
                {name: departmentChosen},
                {$push: 
                    {staff: {
                        _id: savedDoc._id,
                        fullname: savedDoc.name + ' ' + savedDoc.surname
                    }}
                }
            )

        } catch (error) {
            console.log('create Stuff error ' + error)
        }
    }
}



async function main() {
    const db = await connectTo(process.env.MONGO_DB_URI)
    let departments = await Department.find() 
    if (departments.length == 0) {
        await createDepartments();
        departments = await Department.find() 
    }

    createStuff(departments)

}

main()
