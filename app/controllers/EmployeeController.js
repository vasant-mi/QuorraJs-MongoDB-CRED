"use strict"

let BaseController = require('./BaseController')

class EmployeeController extends BaseController {

	static employeeList(req, response) {
		let postInput = req.input.only('search', 'page', 'limit')
		console.log('postInput')
		let search_text = (postInput.search) ? postInput.search : null

		let page = postInput.page
		let current = (postInput.page) ? postInput.page : 1
		let perPage = (postInput.limit) ? postInput.limit : 10
		let skip = 0
		if (page !== "") {
			skip = perPage * (page-1)
		}
		let condition
		if (search_text) {
			condition = {
				$and:[]
			}
			let searchGlobal = {
				$or: [
					{
						name: {like: '%'+search_text+'%'}
					}, {
						email: {like: '%'+search_text+'%'}
					}, {
						phone: {like: '%'+search_text+'%'}
					}, {
						employee_id: {like: '%'+search_text+'%'}
					}, {
						address_line1:{like: '%'+search_text+'%'}
					}, {
						address_line2: {like: '%'+search_text+'%'}
					}, {
						post_code: {like: '%'+search_text+'%'}
					}
				]
			}
			condition.$and.push(searchGlobal)
		}

		Employee.count(condition).then((total)=>{
			Employee.find(condition, {limit:perPage, skip:skip, sort:{"createdAt": -1}}).then(data => {

				response.status(200).send({
					"response": data,
					"pagination": {
						"search": search_text,
						"page": current,
						"per_page": perPage,
						"total": total
					}
				})

			}, err=> {
				response.status(400).send({"error": "" + err});
			})
		})
		let obj = {

		 email: EmployeeController.generateEmail()+"@gmail.com",
		 phone: EmployeeController.phone(),
		 name: EmployeeController.generateEmail(),
		 employee_id: "561465456354",
		 address_line1: "test address",
		 address_line2: "ahmedabad",
		 city: "ahmedabad",
		 state: "Gujrat",
		 country: "Bharat",
		 post_code: EmployeeController.pinCode()
		 }
		 // Employee.create(obj).then(data=>{})
	}

	static generateEmail() {
		let key = '';
		let obj = 'abcdefghijklmnopqrstuvwxyz'
		for (let i = 5; i > 0; --i) {
			key += obj[Math.round(Math.random() * (obj.length - 1))];
		}
		return key;
	}
	static phone() {
		let key = '';
		let obj = '12345679890'
		for (let i = 10; i > 0; --i) {
			key += obj[Math.round(Math.random() * (obj.length - 1))];
		}
		return key;
	}
	static pinCode() {
		let key = '';
		let obj = '12345679890'
		for (let i = 6; i > 0; --i) {
			key += obj[Math.round(Math.random() * (obj.length - 1))];
		}
		return key;
	}

}

module.exports = EmployeeController
