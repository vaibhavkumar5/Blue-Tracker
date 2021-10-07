var month_id = null;

function get_current_month_data(){
	axios({
		method: "get",
		url: BASE_API_URL+"current_month/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		document.getElementById("user-name").innerHTML = response.data.user.username;

		month_id = response.data.id;

		var income = response.data.income;
		var savings = response.data.savings;
		var expenses = response.data.expenses;
		var transactions = response.data.transactions;
		var spendings = expenses + transactions;
		var goal = response.data.goal;

		document.getElementById("expenses").innerHTML = expenses;
		document.getElementById("transactions").innerHTML = transactions;

		document.getElementById("income").innerHTML = income;
		document.getElementById("savings").innerHTML = savings;
		document.getElementById("spendings").innerHTML = spendings;
	})
	// .catch(function(error){ console.log(error) });
	.catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_month_data();

var transactions_container = document.getElementById('transactions-container');
function get_current_month_transactions(){
	axios({
		method: "get",
		url: BASE_API_URL+"current_month_transaction/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		for (var i = 0; i < response.data.length; i++) {
			var entry_data = response.data[i];
			var entry = document.createElement("li");
			entry.classList.add("list-item");
			entry.innerHTML = entry_data.amount + " at " + entry_data.category + " on " + entry_data.date + "/" + entry_data.month_budget_connected.month + "/" +entry_data.month_budget_connected.year + "<br><small>id: " + entry_data.transaction_id + "</small>";
			transactions_container.appendChild(entry);
		}
	})
	.catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_month_transactions();

var expenses_container = document.getElementById('expenses-container');
function get_current_month_expenses(){
	axios({
		method: "get",
		url: BASE_API_URL+"current_month_expense/",
		headers: {"Authorization":authorization}
	})
	.then(function(response){
		for (var i = 0; i < response.data.length; i++) {
			var entry_data = response.data[i];
			var entry = document.createElement("li");
			entry.classList.add("list-item");
			entry.innerHTML = entry_data.amount + " at " + entry_data.category + " on " + entry_data.date + "/" + entry_data.month_budget_connected.month + "/" +entry_data.month_budget_connected.year + "<br><small>id: " + entry_data.expense_id + "</small>";
			expenses_container.appendChild(entry);
		}
	})
	.catch(function(error){ delCookie('Authorization'); window.reload(); });
}
get_current_month_expenses();

var add_to = document.getElementById('add-to');
var switch_to = document.getElementById('switch-to');
var current_expenditure_mode = "transaction";

function toggle_new_expenditure(){
	if(current_expenditure_mode == "transaction"){
		current_expenditure_mode = "expense";
		add_to.innerHTML = "Expense";
		switch_to.innerHTML = "Transaction";
	}else{
		current_expenditure_mode = "transaction";
		add_to.innerHTML = "Transaction";
		switch_to.innerHTML = "Expense";
	}
}

var form = document.getElementsByTagName('form')[0];
function new_expenditure(){
	data = {};

	data["month_budget_connected"] = month_id;

	var date = new Date();
	date = date.getDate();
	data["date"] = date;

	var id = form.elements.id.value;
	if(id != ''){ data[current_expenditure_mode+"_id"]=id; }

	data["amount"] = form.elements.amount.value;;

	var cateogry = form.elements.category.value;
	if(cateogry != ''){ data["category"]=cateogry; }

	console.log(data);
	axios({
		method: "post",
		url: BASE_API_URL+"current_month_" + current_expenditure_mode + "/",
		headers: {"Authorization":authorization},
		data: data
	})
	.then(function(response){ alert(current_expenditure_mode + " entry made successfully!"); location.reload(); })
	.catch(function(error){ alert(error); location.reload(); })

	return false;
}