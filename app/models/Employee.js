"use strict"

module.exports = {
    tableName: 'employee',

    globalId: 'Employee',

    schema: true,

    attributes: {

        name: {
            required: true,
            type: 'string'
        },
        email: {
            required: true,
            type: 'email'
        },
        phone: {
            required: true,
            type: 'string'
        },
        employee_id: {
            type: 'string'
        },
        address_line1: {
            required: true,
            type: 'string'
        },
        address_line2: {
            type: 'string'
        },
        city: {
            required: true,
            type: 'string'
        },
        state: {
            required: true,
            type: 'string'
        },
        country: {
            required: true,
            type: 'string'
        },
        post_code: {
            type: 'integer',
            required: true
        }
    }
}
