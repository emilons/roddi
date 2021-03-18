from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from.serializers import UserSerializer, UserSerializerWithToken, EstateSerializer, ItemSerializer, User_In_EstateSerializer, User_ItemSerializer
from .models import Estate, Item, User_In_Estate, User_Item

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser





# Create your views here.


class ItemCreate(APIView):
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
#    permission_classes = (IsAuthenticated,)
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
@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


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



@api_view(['PUT'])
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
    print("SERIALIZER: ", serializer)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['PUT'])
def user_item_put(request, pk):
    x = pk.split("-")
    fk1 = x[0]
    fk2 = x[1]
    data = request.data
    
    try:
        user_item = User_Item.objects.get(item_id = fk1, user_id = fk2)

        user_item.user = User.objects.get(id=data["user_id"])
        user_item.item = Item.objects.get(id=data["item_id"])
        user_item.donate = data["donate"]
        user_item.discard = data["discard"]
        user_item.wanted = data["wanted"]
        user_item.wanted_level = data["wanted_level"]
    
        user_item.save()

        serializer = User_ItemSerializer(user_item)
        return Response(serializer.data)

    except User_Item.DoesNotExist:
        user_item = User_Item.objects.create(user=User.objects.get(id=data["user_id"]), 
        item=Item.objects.get(id=data["item_id"]),donate=data["donate"],
        discard=data["discard"], wanted=data["wanted"], wanted_level=data["wanted_level"])

        serializer = User_ItemSerializer(user_item)
        return Response(serializer.data)



@api_view(['DELETE'])
def user_item_delete(request, pk):
    user_item = User_Item.objects.get(id=pk)
    user_item.delete()

    return Response("Item successfully deleted!")




##User_In_Estate APIs

@api_view(['POST'])
def user_in_estate_create(request):
    serializer = User_In_EstateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['GET'])
def user_in_estate_list(request):
    user_estates = User_In_Estate.objects.all()
    serializer = User_In_EstateSerializer(user_estates, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def user_in_estate_delete(request, pk):
    user_in_estate = User_In_Estate.objects.get(id=pk)
    user_in_estate.delete()

    return Response("Item successfully deleted!")
