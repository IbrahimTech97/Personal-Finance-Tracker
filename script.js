// Function to update the balance, income, and expense
function updateTotals() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  document.getElementById('total-income').innerText = totalIncome.toFixed(2);
  document.getElementById('total-expense').innerText = totalExpense.toFixed(2);
  document.getElementById('balance').innerText = balance.toFixed(2);
}

// Function to render the transactions list
function renderTransactions() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const transactionList = document.getElementById('transaction-list');
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.classList.add(transaction.type);
    listItem.innerHTML = `
      ${transaction.description} - $${transaction.amount.toFixed(2)}
      <button onclick="removeTransaction('${transaction.id}')">x</button>
    `;
    transactionList.appendChild(listItem);
  });

  updateTotals();
}

// Function to add a new transaction
function addTransaction(event) {
  event.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('transaction-type').value;

  if (description.trim() === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter valid description and amount.');
    return;
  }

  const transaction = {
    id: new Date().getTime().toString(),
    description,
    amount,
    type
  };

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('transaction-form').reset();
  renderTransactions();
}

// Function to remove a transaction
function removeTransaction(id) {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions = transactions.filter(transaction => transaction.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
}

// Initialize the app
document.getElementById('transaction-form').addEventListener('submit', addTransaction);
document.addEventListener('DOMContentLoaded', renderTransactions);
