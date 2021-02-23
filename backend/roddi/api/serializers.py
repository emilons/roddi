from rest_framework import serializers
from .models import User, Estate, Item, User_Item, User_In_Estate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class EstateSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    class Meta:
        model = Estate
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    voters = UserSerializer(many=True)
    class Meta:
        model = Item
        fields = '__all__'


class User_ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Item
        fields = '__all__'


class User_In_EstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_In_Estate
        fields = '__all__'