# Create your views here.
from django.shortcuts import render

def knowmore(request):
    return render(request, 'main/knowmore.html', {})

def index(request):
    return render(request, 'main/index.html', {})
