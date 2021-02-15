from django.urls import path

from adminapp import views

app_name = 'adminapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('admin-users-read/', views.admin_users_read, name='admin_users_read'),
    path('admin-users-create/', views.admin_users_create, name='admin_users_create'),
    path('admin-users-update/<int:id>/', views.admin_users_update, name='admin_users_update'),
    path('admin-users-delete/<int:id>/', views.admin_users_delete, name='admin_users_delete'),
]
