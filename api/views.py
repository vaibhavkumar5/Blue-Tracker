from django.shortcuts import render, redirect
from rest_framework.decorators import api_view

from .serializers import *
from utility.apiresponse import *

@api_view(['GET'])
def Api_Overview(request):
	api_urls = {
		'Api Overview':'/',
		'Get Current Month Budget':'/getcurrentmonthbudget/<str:username>/',
		'Get Previous Month Budget':'/getpreviousmonthbudget/<str:username>/<int:no_of_months>/',
		'Get Year Budget':'/getyearbudget/<str:username>/<int:year>/',
	}
	return Response(api_urls)

def Get_Current_Month_Budget_Object(username):
	return MonthlyBudget.objects.filter(user=User.objects.get(username=username)).order_by('-id')[0]

@api_view(['GET'])
def Get_Current_Month_Budget(request, username):
	serializer = Monthly_Budget_Serializer

	try:
		queryset = Get_Current_Month_Budget_Object(username)
		return ApiGetResponse(serializer, queryset, False)
	except:
		pass
	return ApiGetResponse(serializer)

@api_view(['GET'])
def Get_Previous_Month_Budget(request, username, no_of_months):
	serializer = Monthly_Budget_Serializer

	try:
		queryset = MonthlyBudget.objects.filter(user=User.objects.get(username=username), year=Get_Current_Month_Budget_Object(username).year).order_by('-id')[1:no_of_months+1]
		return ApiGetResponse(serializer, queryset)
	except:
		pass
	return ApiGetResponse(serializer)

@api_view(['GET'])
def Get_Year_Budget(request, username, year):
	serializer = Monthly_Budget_Serializer

	try:
		queryset = MonthlyBudget.objects.filter(user=User.objects.get(username=username), year=year).order_by('id')
		return ApiGetResponse(serializer, queryset)
	except:
		pass
	return ApiGetResponse(serializer)