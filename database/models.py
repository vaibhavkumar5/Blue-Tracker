from django.db import models
from django.contrib.auth.models import User

import uuid

class MonthlyBudget(models.Model):
	month = models.IntegerField(choices=[(i+1, f'{i+1}') for i in range(12)], default=10)
	year = models.IntegerField(default=2021)

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='BudgetUser')

	income = models.IntegerField(default=0)
	goal = models.IntegerField(default=0)

	expenses = models.IntegerField(default=0)
	transactions = models.IntegerField(default=0)

	savings = models.IntegerField(default=0)

	savings_index = models.IntegerField(default=0)

	def Update_Savings(self):
		self.savings = self.income - ( self.expenses + self.transactions )
		self.savings_index = (self.savings * self.income) / (self.goal * self.goal) if self.goal > 0 else 0

	def save(self, *args, **kwargs):
		self.Update_Savings()
		super(MonthlyBudget, self).save(*args, **kwargs)

	def __str__(self):
		return f"{self.user.__str__()}'s Budget of {self.month}-{self.year}"

bill_image_path = 'bills/{0}/{1}'

def Bill_Image_Path(instance, filename):
	return bill_image_path.format(instance.month_budget_connected, filename)

def Get_UUID():
	return uuid.uuid1().__str__()

class Transaction(models.Model):
	transaction_id = models.CharField(max_length=50, primary_key=True, default=Get_UUID)

	month_budget_connected = models.ForeignKey(MonthlyBudget, on_delete=models.CASCADE, related_name="month_budget_connected_to_transaction")
	date = models.IntegerField(choices=[(i+1, f'{i+1}') for i in range(31)], default=15)

	amount = models.IntegerField(default=10)
	category = models.CharField(max_length=30, default="miscellaneous")

	# bill_image = models.ImageField(upload_to=Bill_Image_Path, null=True, blank=True)

	def save(self, *args, **kwargs):
		self.month_budget_connected.transactions += self.amount
		self.month_budget_connected.save()
		super(Transaction, self).save(*args, **kwargs)

	def __str__(self):
		return f'{self.amount} spent on {self.category} in {self.month_budget_connected}'

class Expense(models.Model):
	expense_id = models.CharField(max_length=50, primary_key=True, default=Get_UUID)

	month_budget_connected = models.ForeignKey(MonthlyBudget, on_delete=models.CASCADE, related_name="month_budget_connected_to_expense")
	date = models.IntegerField(choices=[(i+1, f'{i+1}') for i in range(31)], default=15)
	# date = models.CharField(max_length=2, choices=[(f'{i+1}', f'{i+1}') for i in range(31)], default='15')

	amount = models.IntegerField(default=10)
	category = models.CharField(max_length=30, default="miscellaneous")

	# bill_image = models.ImageField(upload_to=Bill_Image_Path, null=True, blank=True)

	def save(self, *args, **kwargs):
		self.month_budget_connected.expenses += self.amount
		self.month_budget_connected.save()
		super(Expense, self).save(*args, **kwargs)

	def __str__(self):
		return f'{self.amount} spent on {self.category} in {self.month_budget_connected}'