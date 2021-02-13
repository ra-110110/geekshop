from django.urls import path

from adminapp import views

app_name = 'adminapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('admin-users-read/', views.admin_users_read, name='admin_users_read'),
]
