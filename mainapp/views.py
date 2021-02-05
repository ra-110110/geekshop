from django.shortcuts import render
import datetime
from mainapp.models import ProductCategory, Product


def index(request):
    context = {
        'title': 'главная',
        'date': datetime.datetime.now()
    }
    return render(request, 'mainapp/index.html', context)


def products(request, id=None):
    context = {
        'title': 'каталог',
        'products': Product.objects.all(),
        'categories': ProductCategory.objects.all()
    }
    return render(request, 'mainapp/products.html', context)
