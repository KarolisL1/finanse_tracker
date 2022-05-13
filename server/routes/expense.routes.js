const ExpenseController = require('../controllers/expense.controller');

module.exports = (app) => {
    app.get('/api/expenses', ExpenseController.getAllExpenses);
    app.get('/api/expenses/:id', ExpenseController.getExpenseById);
    app.post('/api/expenses/new', ExpenseController.addExpense);
    app.put('/api/expenses/edit/:id', ExpenseController.editExpense);
    app.delete('/api/expenses/delete/:id', ExpenseController.deleteExpense);
    app.get('/api/expenses/user/:userid', ExpenseController.getExpensesByUserId);
}