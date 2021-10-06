from django.shortcuts import render
from django.http import HttpResponse

def Index(request):
	return render(request, 'index.html')

def RenderPage(request, page_request):
	page_request = page_request.replace(".html", "")

	if page_request == 'favicon.ico':
		return HttpResponse('')

	return render(request, f'{page_request}.html')