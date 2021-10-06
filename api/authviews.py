from django.contrib.auth import logout

from database.models import User
from utility.apiresponse import *
from requests import post

class log_out(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		request.user.auth_token.delete()
		logout(request)
		return HttpResponse(status=200, content=b'Logged out')

class Authorize(APIView):
	def post(self, request):
		try:
			username = request.POST['username']
			password = request.POST['password']
			email = request.POST['email']
		except:
			return HttpResponse(status=400, content=b'Bad Request')

		try:
			user = User.objects.get(username=username, email=email)
		except:
			try:
				user = User.objects.create_user(username=username, password=password, email=email)
				user.save()
			except:
				return HttpResponse(status=409, content=b'Username already exists')


		authorization_response = post(url=BASE_API_URL+'login/', data={'username':username, 'password':password})
		return HttpResponse(status=authorization_response.status_code, content=authorization_response.content)