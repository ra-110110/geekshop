from django.shortcuts import render
import datetime
from mainapp.models import ProductCategory, Product
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def index(request):
    context = {
        'title': 'главная',
        'date': datetime.datetime.now()
    }
    return render(request, 'mainapp/index.html', context)


# def products(request, category_id=None):
#     context = {
#         'title': 'каталог',
#         'categories': ProductCategory.objects.all(),
#     }
#     if category_id:
#         products = Product.objects.filter(category_id=category_id)
#     else:
#         products = Product.objects.all()
#     #вариант оптимизации:
#     #products = Product.objects.filter(category_id=category_id) if category_id else Product.objects.all()
#     context.update({'products': products})
#     return render(request, 'mainapp/products.html', context)

def products(request, category_id=None, page=1):
    if category_id:
        products = Product.objects.filter(category_id=category_id).order_by('price')
    else:
        products = Product.objects.all().order_by('price') #"-price"  - обратная сортировка
    per_page = 3
    paginator = Paginator(products, per_page)
    products_paginator = paginator.page(page)
    context = {
        'title': 'каталог',
        'categories': ProductCategory.objects.all(),
        'products': products_paginator,
    }
    return render(request, 'mainapp/products.html', context)
    # try:
    #     products_paginator = paginator.page(page)
    # except PageNotAnInteger:
    #     products_paginator = paginator.page(1)
    # except EmptyPage:
    #     products_paginator = paginator.page(paginator.num_pages)
