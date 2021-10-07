from rest_framework import serializers

from database.models import *

class User_Serializer(serializers.ModelSerializer):
	class Meta(object):
		model = User
		fields = ("username", "email")

class Monthly_Budget_Serializer(serializers.ModelSerializer):
	user = User_Serializer(many=False)
	class Meta(object):
		model = MonthlyBudget
		fields = "__all__"

class Transaction_Budget_Serializer(serializers.ModelSerializer):
	month_budget_connected = Monthly_Budget_Serializer(many=False)
	class Meta(object):
		model = Transaction
		fields = "__all__"

class New_Transaction_Budget_Serializer(serializers.ModelSerializer):
	class Meta(object):
		model = Transaction
		fields = "__all__"

class Expense_Budget_Serializer(serializers.ModelSerializer):
	month_budget_connected = Monthly_Budget_Serializer(many=False)
	class Meta(object):
		model = Expense
		fields = "__all__"

class New_Expense_Budget_Serializer(serializers.ModelSerializer):
	class Meta(object):
		model = Expense
		fields = "__all__"