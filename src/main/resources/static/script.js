const API_URL = "http://localhost:8080/expenses";

async function fetchExpenses() {
    const response = await fetch(API_URL);
    const expenses = await response.json();

    const expenseList = document.getElementById("expenseList");
    const totalAmount = document.getElementById("totalAmount");

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(expense => {

        total += expense.amount;

        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${expense.title}</h3>
                <p class="amount">₹${expense.amount}</p>
                <span>${expense.category}</span>
            </div>

            <button onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(expenseItem);
    });

    totalAmount.innerText = `₹${total}`;
}

async function addExpense() {

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (!title || !amount || !category) {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        title,
        amount,
        category
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";

    fetchExpenses();
}

async function deleteExpense(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchExpenses();
}

fetchExpenses();