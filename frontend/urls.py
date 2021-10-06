from django.urls import path 
from .views import *

urlpatterns = [
	path('', Index),
	path('<str:page_request>/', RenderPage)
]