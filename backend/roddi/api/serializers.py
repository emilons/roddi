from rest_framework import serializers
from .models import Estate, Item, User_Item, User_In_Estate
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username','email','is_superuser', 'date_joined')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'email', 'password', 'date_joined')


class EstateSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Estate
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    voters = UserSerializer(many=True, read_only=True)
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
