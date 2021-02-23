from rest_framework import serializers
from .models import User, Estate, Item, User_Item


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class EstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estate
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class User_ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Item
        fields = '__all__'

