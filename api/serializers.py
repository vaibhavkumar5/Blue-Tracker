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