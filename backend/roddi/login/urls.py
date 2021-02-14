from django.urls import path

from . import views


urlpatterns = [
    path('api/', views.api_overview, name="api-overview"),
    path('api/user-list/', views.user_list, name="user-overview"),
    path('api/user-detail/<str:pk>/', views.user_detail, name= "user-detail"),
    path('api/user-create/', views.user_create, name="user-create"),
    path('api/user-update/<str:pk>/', views.user_update, name="user-update"),
    path('api/user-delete/<str:pk>/', views.user_delete, name="user-delete"),

    path('api/estate-list/', views.estate_list, name="estate-overview"),
    path('api/estate-detail/<str:pk>/', views.estate_detail, name= "estate-detail"),
    path('api/estate-create/', views.estate_create, name="estate-create"),
    path('api/estate-update/<str:pk>/', views.estate_update, name="estate-update"),
    path('api/estate-delete/<str:pk>/', views.estate_delete, name="estate-delete"),
]