const ExpenseController = require('../controllers/expense.controller');

module.exports = (app) => {
    app.get('/api/expenses', ExpenseController.getAllExpenses);
    app.post('/api/expenses/new', ExpenseController.addExpense);
}