const categorySelect = document.getElementById('item-name');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expenses-tbody');
const totalAmountCell = document.getElementById('total-amount');

let expenses = [];
let totalAmount = 0;

addBtn.addEventListener('click', addExpense);

function addExpense() {
    const category = categorySelect.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const date = dateInput.value.trim();

    if (!validateInput(category, amount, date)) {
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    renderExpenseRow(expense);
    resetForm();
}

function validateInput(category, amount, date) {
    if (!category) {
        showAlert('Please enter an Item');
        return false;
    }
    if (isNaN(amount) || amount <= 0) {
        showAlert('Please enter a valid amount');
        return false;
    }
    if (!date) {
        showAlert('Please select a date');
        return false;
    }
    return true;
}

function showAlert(message) {
    alert(message);
}

function renderExpenseRow(expense) {
    const newRow = expenseTableBody.insertRow();
    newRow.innerHTML = `
        <td>${expense.category}</td>
        <td>${expense.amount}</td>
        <td>${expense.date}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteExpense(expense, newRow);
    });
}

function deleteExpense(expense, row) {
    const index = expenses.indexOf(expense);
    if (index !== -1) {
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expenses.splice(index, 1);
        expenseTableBody.removeChild(row);
    }
}

function resetForm() {
    categorySelect.value = '';
    amountInput.value = '';
}
