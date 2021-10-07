from django.urls import path
from .views import *
from .authviews import *

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('', api_overview.as_view()),

	path('authorize/', authorize.as_view()),
    path('login/', obtain_auth_token),
    path('logout/', log_out.as_view()),

    path('current_month/', current_month.as_view()),
    path('last_month/', last_month.as_view()),
    path('current_year/', current_year.as_view()),
]