let expenses = [];
let totalAmount = 0;

const form = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const totalAmountSpent = document.getElementById('totalAmount');

// Function to save expenses to local storage
function saveExpenses() {
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log('Expense saved: ' + expenses.length);
    }
    catch (error) {
        console.error('Error saving expenses:', error);
    }
}

// Function to load expenses from local storage
function loadExpenses() {
    try {
        const saved = localStorage.getItem('expenses');

        if(saved) {
            expenses = JSON.parse(saved);
            console.log('Expenses loaded: ' + expenses.length);
        }
        else {
            console.log('No expenses found in local storage.');
        }
    }
    catch (error) {
        console.error('Error loading expenses:', error);
        expenses = [];
    }
}

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

    saveExpenses();

    updateExpensesList();
    updateTotal();
    form.reset();
});


function updateExpensesList() {
    expensesList.innerHTML = '';

    if(expenses.length === 0) {
        expensesList.innerHTML = '<p>No expenses recorded yet.</p>';
        return;
    }

    // otherwise we create the html for each expense
    expenses.forEach(expense => {
        const expenseDiv = document.createElement('div');
        expenseDiv.className = 'expense-item';
        expenseDiv.innerHTML = `
            <div class="expense-info">
                <strong>${expense.description}</strong><br>
                <small>${expense.date}</small>
                <span class="expense-category">${expense.category}</span>
            </div>
            <div>
                <span class="expense-amount">${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        `;

        expensesList.appendChild(expenseDiv);
    });
}

function updateTotal() {
    totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountSpent.textContent = totalAmount.toFixed(2);
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    updateExpensesList();
    updateTotal();
}

document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    updateExpensesList();
    updateTotal();
});