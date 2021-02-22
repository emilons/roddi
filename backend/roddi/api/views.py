from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from.serializers import UserSerializer, EstateSerializer, ItemSerializer, User_ItemSerializer
from .models import User, Estate, Item, User_Item




# Create your views here.


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'User List': '/user-list/',
        'User Detail View':'/user-detail/<str:pk>',
        'User Create': '/user-create/',
        'User Update':'/user-update/<str:pk>',
        'User Delete': '/user-delete/<str:pk>',
        'Estate List': '/estate-list/',
        'Estate Detail View': '/estate-detail/<str:pk>',
        'Estate Create': '/estate-create/',
        'Estate Update': '/estate-update/<str:pk>',
        'Estate Delete': '/estate-delete/<str:pk>',
        'Item List': '/item-list/',
        'Item Detail View': '/item-detail/<str:pk>',
        'Item Create': '/item-create/',
        'Item Update': '/item-update/<str:pk>',
        'Item Delete': '/item-delete/<str:pk>',
        'User_Item List': '/user_item-list/',
        'User_Item Detail View': '/user_item-detail/<str:pk>',
        'User_Item Create': '/user_item-create/',
        'User_Item Update': '/user_item-update/<str:pk>',
        'User_Item Delete': '/user_item-delete/<str:pk>',
    }
    return Response(api_urls)



#API User
@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_detail(request, pk):
    users = User.objects.get(id=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def user_create(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['PUT'])
def user_update(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def user_delete(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response("Item successfully deleted!")




#API Estate
@api_view(['GET'])
def estate_list(request):
    estates = Estate.objects.all()
    serializer = EstateSerializer(estates, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def estate_detail(request, pk):
    estates = Estate.objects.get(id=pk)
    serializer = EstateSerializer(estates, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def estate_create(request):
    serializer = EstateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['PUT'])
def estate_update(request, pk):
    estate = Estate.objects.get(id=pk)
    serializer = EstateSerializer(instance=estate, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def estate_delete(request, pk):
    estate = Estate.objects.get(id=pk)
    estate.delete()

    return Response("Item successfully deleted!")



#API Item
@api_view(['GET'])
def item_list(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def item_detail(request, pk):
    items = Item.objects.get(id=pk)
    serializer = ItemSerializer(items, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def item_create(request):
    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def item_update(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(instance=item, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def item_delete(request, pk):
    item = Item.objects.get(id=pk)
    item.delete()

    return Response("Item successfully deleted!")



#API UserItem
@api_view(['GET'])
def user_item_list(request):
    user_items = User_Item.objects.all()
    serializer = User_ItemSerializer(user_items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_item_detail(request, pk):
    user_item = Item.objects.get(id=pk)
    serializer = User_ItemSerializer(user_items, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def user_item_create(request):
    serializer = User_ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['PUT'])
def user_item_update(request, pk):
    user_item = User_Item.objects.get(id=pk)
    serializer = User_ItemSerializer(instance=estate, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def user_item_delete(request, pk):
    user_item = User_Item.objects.get(id=pk)
    user_item.delete()

    return Response("Item successfully deleted!")

