from django.urls import path
from . import views


urlpatterns = [
    path('', views.api_overview, name="api-overview"),
    path('user-list/', views.user_list, name="user-overview"),
    path('user-detail/<str:pk>/', views.user_detail, name= "user-detail"),
    path('user-create/', views.user_create, name="user-create"),
    path('user-update/<str:pk>/', views.user_update, name="user-update"),
    path('user-delete/<str:pk>/', views.user_delete, name="user-delete"),

    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),

    path('estate-list/', views.estate_list, name="estate-overview"),
    path('estate-detail/<str:pk>/', views.estate_detail, name= "estate-detail"),
    path('estate-create/', views.estate_create, name="estate-create"),
    path('estate-update/<str:pk>/', views.estate_update, name="estate-update"),
    path('estate-delete/<str:pk>/', views.estate_delete, name="estate-delete"),

    path('item-list/', views.item_list, name="item-overview"),
    path('item-detail/<str:pk>/', views.item_detail, name= "item-detail"),
    path('item-create/', views.item_create, name="item-create"),
    path('item-update/<str:pk>/', views.item_update, name="item-update"),
    path('item-delete/<str:pk>/', views.item_delete, name="item-delete"),

    path('user_item-list/', views.user_item_list, name="user_item-overview"),
    path('user_item-detail/<str:pk>/', views.user_item_detail, name= "user_item-detail"),
    path('user_item-create/', views.user_item_create, name="user_item-create"),
    path('user_item-update/<str:pk>/', views.user_item_update, name="user_item-update"),
    path('user_item-delete/<str:pk>/', views.user_item_delete, name="user_item-delete"),

    path('user_in_estate-create/', views.user_in_estate_create, name="user_in_estate-create"),
    path('user_in_estate-list/', views.user_in_estate_list, name="user_in_estate-overview"),
    path('user_in_estate-delete/<str:pk>/', views.user_in_estate_delete, name="user_in_estate-delete")


]