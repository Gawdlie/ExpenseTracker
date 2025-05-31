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
    updateExpensesList();
    updateTotal();
}

