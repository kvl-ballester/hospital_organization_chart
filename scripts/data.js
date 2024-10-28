const Department = require('../models/department')

const departments = [
    new Department({name: 'General Dentistry', staff: []}),
    new Department({name: 'Pediatric Dentistry', staff: []}),
    new Department({name: 'Restorative Dentistry', staff: []}),
    new Department({name: 'Surgery', staff: []}),
    new Department({name: 'Orthodontics', staff: []})
]

const people = [
    {name: 'Alfred', surname: 'Christensen', department: 'General Dentistry'},
    {name: 'Francisco', surname: 'Willard', department: 'Pediatric Dentistry'},
    {name: 'Lisa', surname: 'Harris', department: 'Restorative Dentistry'},
    {name: 'Constance', surname: 'Smith', department: 'Surgery'},
    {name: 'Leslie', surname: 'Roche', department: 'Orthodontics'},
    {name: 'John', surname: 'Dudley', department: 'General Dentistry'},
    {name: 'Janet', surname: 'Doe', department: 'General Dentistry'},
    {name: 'Sarah', surname: 'Alvarez', department: 'Pediatric Dentistry'},
    {name: 'Danny', surname: 'Perez', department: 'Restorative Dentistry'},
    {name: 'Travis', surname: 'Combs', department: 'Orthodontics'},
]

module.exports = {departments, people}