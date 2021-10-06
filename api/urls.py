from django.urls import path
from .views import *

urlpatterns = [
	path('', Api_Overview),
	path('getcurrentmonthbudget/<str:username>/', Get_Current_Month_Budget),
	path('getpreviousmonthbudget/<str:username>/<int:no_of_months>', Get_Previous_Month_Budget),
	path('getyearbudget/<str:username>/<int:year>', Get_Year_Budget),
]