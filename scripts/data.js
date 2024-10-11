const Department = require('../models/department')

const departments = [
    new Department({name: 'General Dentistry', staff: []}),
    new Department({name: 'Pediatric Dentistry', staff: []}),
    new Department({name: 'Restorative Dentistry', staff: []}),
    new Department({name: 'Surgery', staff: []}),
    new Department({name: 'Orthodontics', staff: []})
]

const people = [
    {name: 'Alfred', surname: 'Christensen'},
    {name: 'Francisco', surname: 'Willard'},
    {name: 'Lisa', surname: 'Harris'},
    {name: 'Constance', surname: 'Smith'},
    {name: 'Leslie', surname: 'Roche'},
]

module.exports = {departments, people}