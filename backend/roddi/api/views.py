from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from.serializers import UserSerializer, UserSerializerWithToken, EstateSerializer, ItemSerializer
from .models import Estate, Item

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.views import APIView





# Create your views here.


@api_view(['GET'])
def api_overview(request):
    permission_classes = (IsAuthenticated,)
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
        'Item List': '/estate-list/',
        'Item Detail View': '/estate-detail/<str:pk>',
        'Item Create': '/estate-create/',
        'Item Update': '/estate-update/<str:pk>',
        'Item Delete': '/estate-delete/<str:pk>',
    }
    return Response(api_urls)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    permission_classes = (IsAuthenticated,)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#API User
#@api_view(['GET'])
#def user_list(request):
    #users = User.objects.all()
    #serializer = UserSerializer(users, many=True)
    #return Response(serializer.data)


@api_view(['GET'])
def user_detail(request, pk):
    #permission_classes = (IsAuthenticated,)
    #authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    users = User.objects.get(id=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def user_create(request):
    #permission_classes = (IsAuthenticated,)
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['POST'])
def user_update(request, pk):
    #permission_classes = (IsAuthenticated,)
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def user_delete(request, pk):
    #permission_classes = (IsAuthenticated,)
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



@api_view(['POST'])
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
    serializer = ItemSerializer(estates, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def item_create(request):
    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['POST'])
def item_update(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(instance=estate, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def item_delete(request, pk):
    item = Item.objects.get(id=pk)
    item.delete()

    return Response("Item successfully deleted!")
