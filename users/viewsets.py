from rest_framework import viewsets
from users.models import User
from rest_framework import status
from django.contrib.auth import logout
from django.http.response import JsonResponse
from . import serializers
from rest_framework.parsers import JSONParser

class UserViewset(viewsets.ModelViewSet):
    # queryset = models.User.objects.all()
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.data["lgUserRole"] == 'admin' or instance.username == request.data["loggedInUser"]:
            user = User.objects.get(pk=instance.id)
            print(user)
            user.delete()
            return JsonResponse({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            print('hello')
            return JsonResponse({"message": "User cannot be deleted"}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance.username)
        print(request.data)
        if instance.username == request.data["loggedInUser"]:
            kwargs['partial'] = True
            # return self.update(request, *args, **kwargs)
            # super().update(*args, **kwargs)
            user = User.objects.get(pk=instance.id)
            final = request.data
            del final['loggedInUser']
            del final['lgUserRole']
            user_serializer = serializers.UserSerializer(user, data=final)
            if user_serializer.is_valid():
                user_serializer.save()
            return JsonResponse({"message": "User updated"}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({"message": "User cannot be updated"}, status=status.HTTP_403_FORBIDDEN)