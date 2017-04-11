"use strict"

let Route = App.router


let EmployeeControllers = require("./controllers/EmployeeController");

Route.get('/employee/list', {
	uses: EmployeeControllers.employeeList
})
