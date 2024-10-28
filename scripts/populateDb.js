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
        console.log('connectTo error: ' + error);
      }
}

async function createDepartments() {
    for (const departmentDoc of data.departments) {
        const savedDoc = await departmentDoc.save()
        console.log('Department ' + savedDoc.name + ' created!')
    }
}

async function createStuff() {
    for (const person of data.people) {

        const employeeDoc = new Employee({
            name: person.name,
            surname: person.surname,
            department: person.department
        })

        try {
            // Create employee file
            const savedDoc = await employeeDoc.save()
            // Add employee to department
            await Department.updateOne(
                {name: person.department},
                {$push: 
                    {staff: {
                        _id: savedDoc._id,
                        fullname: savedDoc.name + ' ' + savedDoc.surname
                    }}
                }
            )

        } catch (error) {
            console.log('createStuff error: ' + error)
        }
    }
}



async function main() {
    await connectTo(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/clinic_db')
    let departments = await Department.find() 
    if (departments.length == 0) {
        await createDepartments();
        departments = await Department.find() 
    }

    await createStuff(departments)
    mongoose.connection.close()

}

main()
