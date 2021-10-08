from django.shortcuts import redirect
from rest_framework.decorators import api_view

from .serializers import *
from utility.apiresponse import *

class api_overview(APIView):
	def get(self, request):
		api_urls = {
			'Api Overview':'/',
			'Current Month Budget':'/current_month/',
			'Last Month Budget':'/last_month/',
			'Current Year Budget':'/current_year/',
		}
		return Response(api_urls)

class current_month(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Monthly_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			queryset = Get_Current_Month_Budget_Object(user)
			return ApiGetResponse(serializer, queryset, False)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

	def put(self, request):
		serializer = New_Monthly_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			instance = Get_Current_Month_Budget_Object(user)
			return ApiUpdateResponse(serializer, request, instance)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class last_month(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Monthly_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			queryset = Get_Last_Month_Budget_Object(user)
			return ApiGetResponse(serializer, queryset, False)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class current_year(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Monthly_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			queryset = Get_Current_Year_Budget_Objects(user)
			return ApiGetResponse(serializer, queryset)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class current_month_transaction(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Transaction_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Current_Month_Budget_Object(user)
			queryset = Transaction.objects.filter(month_budget_connected=month).order_by('-date')
			return ApiGetResponse(serializer, queryset)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

	def post(self, request):
		serializer = New_Transaction_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Current_Month_Budget_Object(user)
			return ApiPostResponse(serializer, request)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class last_month_transaction(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Transaction_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Last_Month_Budget_Object(user)
			queryset = Transaction.objects.filter(month_budget_connected=month).order_by('-date')
			return ApiGetResponse(serializer, queryset)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class current_month_expense(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Expense_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Current_Month_Budget_Object(user)
			queryset = Expense.objects.filter(month_budget_connected=month).order_by('-date')
			return ApiGetResponse(serializer, queryset)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

	def post(self, request):
		serializer = New_Expense_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Current_Month_Budget_Object(user)
			return ApiPostResponse(serializer, request)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')

class last_month_expense(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = Expense_Budget_Serializer
		user = Get_User_By_Auth_Token(request)

		try:
			month = Get_Last_Month_Budget_Object(user)
			queryset = Expense.objects.filter(month_budget_connected=month).order_by('-date')
			return ApiGetResponse(serializer, queryset)
		except:
			return HttpResponse(status=500, content=b'Internal Server Error')