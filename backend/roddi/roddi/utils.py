from api.serializers import UserSerializer

"""Customize JWT response payload handler to include users data 
(along with token) when user logs in."""
def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }