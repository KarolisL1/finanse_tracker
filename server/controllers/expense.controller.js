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

    deleteExpense(req, res) {
        ExpenseModel.deleteOne({_id: req.params.id})
        .then(deletedItem => {
            res.json({results: deletedItem});
        })
        .catch(err => {
            res.json({message: "Something is wrong", error: err});
        });
    }

    editExpense(req, res) {
        ExpenseModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedExpense => {
            console.log("Req body: ->",req.body, updatedExpense)
            res.json({results: updatedExpense});
        })
        .catch(err => {
            res.json({message: "Something is wrong", error: err});
        });
    }

    getExpenseById(req, res) {
        ExpenseModel.findOne({_id: req.params.id})
        .then(expense => {
            res.json({results: expense});
        })
        .catch(err => {
            res.json({message: "Something is wrong", error: err});
        });
    }

}

module.exports = new ExpenseController();