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


### Every view for this project, required for REST API. ###
### Every view either requires input as a JSON-object, or gives out a JSON-object ###
### For almsot every function requiring a pk (primary-key), the pk is the auto-generated integer pk ###
### The only exception being the User-Item PUT function ###

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


#Defines the POST request to create Item.
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




#Determine the current user by their token, and return their data.
@api_view(['GET'])
def current_user(request):

#    permission_classes = (IsAuthenticated,)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)



#Create a new user. It's called 'UserList' because normally we'd have a get
#method here too, for retrieving a list of all User objects.
class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Gives a list for all Users in the system.
@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



#Gives a User determined by pk (primary-key) argument.
@api_view(['GET'])
def user_detail(request, pk):
    #permission_classes = (IsAuthenticated,)
    #authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    users = User.objects.get(id=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)



#Create a User.
@api_view(['POST'])
def user_create(request):
    #permission_classes = (IsAuthenticated,)
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


#Update a User's information, determined by pk (primary-key).
@api_view(['PUT'])
def user_update(request, pk):
    #permission_classes = (IsAuthenticated,)
    user = User.objects.get(id=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)



#Deletes a User, determined by pk (primary-key).
@api_view(['DELETE'])
def user_delete(request, pk):
    #permission_classes = (IsAuthenticated,)
    user = User.objects.get(id=pk)
    user.delete()

    return Response("Item successfully deleted!")



#Gives a list of every Estate in the system.
@api_view(['GET'])
def estate_list(request):
    estates = Estate.objects.all()
    serializer = EstateSerializer(estates, many=True)
    return Response(serializer.data)


#Gives an Estate, determined by pk (primary-key).
@api_view(['GET'])
def estate_detail(request, pk):
    estates = Estate.objects.get(id=pk)
    serializer = EstateSerializer(estates, many=False)
    return Response(serializer.data)


#Create Estate, determined by pk (primary-key).
@api_view(['POST'])
def estate_create(request):
    serializer = EstateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


#Update an estate, determined by pk (primary-key).
@api_view(['PUT'])
def estate_update(request, pk):
    estate = Estate.objects.get(id=pk)
    serializer = EstateSerializer(instance=estate, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#Delete an estate, determined by pk (primary-key)
@api_view(['DELETE'])
def estate_delete(request, pk):
    estate = Estate.objects.get(id=pk)
    estate.delete()

    return Response("Item successfully deleted!")



#Gives a list of all Items, across all Estates, in the system.
@api_view(['GET'])
def item_list(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


#Gives an Item, determined by pk (primary-key).
@api_view(['GET'])
def item_detail(request, pk):
    items = Item.objects.get(id=pk)
    serializer = ItemSerializer(items, many=False)
    return Response(serializer.data)


#Create an Item.
@api_view(['POST'])
def item_create(request):
    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


#Gives an Item, determined by pk (primary-key).
@api_view(['PUT'])
def item_update(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(instance=item, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#Deletes an Item, determined by pk (primary-key).
@api_view(['DELETE'])
def item_delete(request, pk):
    item = Item.objects.get(id=pk)
    item.delete()

    return Response("Item successfully deleted!")



#Gives a list of all relations between a User and an Item (in other words: every vote in the system).
@api_view(['GET'])
def user_item_list(request):
    user_items = User_Item.objects.all()
    serializer = User_ItemSerializer(user_items, many=True)
    return Response(serializer.data)


#Gives a particular User-Item relation (vote), determined by pk (primary-key).
@api_view(['GET'])
def user_item_detail(request, pk):
    user_item = Item.objects.get(id=pk)
    serializer = User_ItemSerializer(user_items, many=False)
    return Response(serializer.data)


#Creates a new User-Item relation (vote).
@api_view(['POST'])
def user_item_create(request):
    serializer = User_ItemSerializer(data=request.data)
    print("SERIALIZER: ", serializer)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


#Updates an existing User-Item relation or creates a new row if an existing one is not found.
#For this particular function, the pk (primary-key) is the ID of the User and ID of the Item in question.
#In simple terms: if a User has never voted for an Item before, a new row gets inserted into the 
#User-Item table in MySQL. If the User has already voted on this Item, the existing row is simply updated.
@api_view(['PUT'])
def user_item_put(request, pk):
    x = pk.split("-") #since pk is on the form userID-itemID, they are separated here
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


#Deletes a User-Item relation, using the generated integer pk (primary-key).
@api_view(['DELETE'])
def user_item_delete(request, pk):
    user_item = User_Item.objects.get(id=pk)
    user_item.delete()

    return Response("Item successfully deleted!")



#Creates a User-Estate relation (making a User a member of an Estate).
@api_view(['POST'])
def user_in_estate_create(request):
    serializer = User_In_EstateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



#Gives a list of every User-Estate relation (every member in every estate).
@api_view(['GET'])
def user_in_estate_list(request):
    user_estates = User_In_Estate.objects.all()
    serializer = User_In_EstateSerializer(user_estates, many=True)
    return Response(serializer.data)



#Deletes a User-Estate relation (deletes a member from estate), determined by pk (primary-key).
@api_view(['DELETE'])
def user_in_estate_delete(request, pk):
    user_in_estate = User_In_Estate.objects.get(id=pk)
    user_in_estate.delete()

    return Response("Item successfully deleted!")
