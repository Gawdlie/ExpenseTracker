let expenses = [];
let totalAmount = 0;

const form = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const totalAmountSpent = document.getElementById('totalAmount');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // create new object for the new expense
    const newExpense = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    }
    
    expenses.push(newExpense);


});

function updateExpensesList() {

}

function updateTotal() {

}

function deleteExpense(id) {

}

