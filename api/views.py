from django.shortcuts import redirect
from rest_framework.decorators import api_view

from .serializers import *
from utility.apiresponse import *
from rest_framework.authtoken.models import Token

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
		auth_token = request.headers['Authorization'].replace("Token ", "")

		user = Token.objects.get(key=auth_token).user

		serializer = Monthly_Budget_Serializer

		try:
			queryset = Get_Current_Month_Budget_Object(user)
			return ApiGetResponse(serializer, queryset, False)
		except:
			pass
		return ApiGetResponse(serializer)

class last_month(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		auth_token = request.headers['Authorization'].replace("Token ", "")

		user = Token.objects.get(key=auth_token).user

		serializer = Monthly_Budget_Serializer

		try:
			queryset = Get_Last_Month_Budget_Object(user)
			return ApiGetResponse(serializer, queryset, False)
		except:
			pass
		return ApiGetResponse(serializer)

class current_year(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		auth_token = request.headers['Authorization'].replace("Token ", "")

		user = Token.objects.get(key=auth_token).user

		serializer = Monthly_Budget_Serializer

		try:
			queryset = Get_Current_Year_Budget_Objects(user)
			return ApiGetResponse(serializer, queryset)
		except:
			pass
		return ApiGetResponse(serializer)