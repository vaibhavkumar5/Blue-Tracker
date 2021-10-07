from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated

from database.models import MonthlyBudget
from django.utils import timezone

BASE_API_URL = 'https://bluetracker.herokuapp.com/api/'

def ApiGetResponse(serializer, queryset=[], many=True):
	serializer = serializer(queryset, many=many)
	return Response(serializer.data)

def ApiUpdateResponse(serializer, request, instance):
	serializer = serializer(instance=instance, data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

def ApiPostResponse(serializer, request):
	serializer = serializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)

def Get_Current_Month_Budget_Object(user):
	today = timezone.now().today()

	if len(MonthlyBudget.objects.filter(user=user, month=today.month, year=today.year)) == 0:
		MonthlyBudget(user=user, month=today.month, year=today.year).save()
		return Get_Current_Month_Budget_Object(user)

	return MonthlyBudget.objects.filter(user=user).order_by(*['-year', '-month'])[0]

def Get_Last_Month_Budget_Object(user):
	return MonthlyBudget.objects.filter(user=user).order_by(*['-year', '-month'])[1]

def Get_Current_Year_Budget_Objects(user):
	current_month_object = Get_Current_Month_Budget_Object(user)
	return MonthlyBudget.objects.filter(user=user, year=current_month_object.year).order_by('-month')
