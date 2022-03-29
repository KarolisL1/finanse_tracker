const ExpenseModel = require('../models/expense.model');
const jwt = require('jsonwebtoken');

class ExpenseController {
    getAllExpenses(req, res) {
        ExpenseModel.find()
            .then(allExpenses => {
                res.json({results: allExpenses});
            })
            .catch(err => {
                res.json(err);
            })
    }

    addExpense(req, res) {
        ExpenseModel.create(req.body)
        .then(newItem => {
            res.json({results: newItem});
        })
        .catch(err => {
            res.json({message: "Something is wrong", error: err});
        });
    }
}

module.exports = new ExpenseController();