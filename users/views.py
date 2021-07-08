from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from users.models import User
from users.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
# # Create your views here.


@api_view(['GET'])
def overview(request):
    api_urls = {
        'List': '/user-list/',
        'Detail View': '/user-detail/<str:pk>/',
        'Create': '/user-create/',
        'Update': '/user-update/<str:pk>',
        'Delete': 'user-delete/<str:pk>',
    }
    return JsonResponse(api_urls)


@api_view(['GET'])
def users_list(request):
    if request.method == 'GET':
        users = User.objects.all().order_by('id')
        users_serializer = UserSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Route not found in GET call'}, status=status.HTTP_404_NOT_FOUND)


# @api_view(['POST'])
# def create_user(request):
#     if request.method == 'POST':

#         # base64_bytes = base64.b64encode(user_data["password"])
#         # user_data["password"] = base64_bytes.decode('ascii')

#         # if User.objects.filter(email=user_data["email"]).exists():
#         #     return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
#         # else:
#         user_data = JSONParser().parse(request)
#         user_serializer = UserSerializer(data=user_data)
#         if user_serializer.is_valid():
#             user_serializer.save()
#             return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_detail(request, pk):
    user = User.objects.get(pk=pk)
    user_serializer = UserSerializer(user, many=False)
    return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)


# @api_view(['PUT'])
# def user_update(request, pk):
#     user = User.objects.get(pk=pk)
#     user_data = JSONParser().parse(request)
#     # if User.objects.filter(email=user_data["email"]).exists():
#     #     return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
#     user_serializer = UserSerializer(user, data=user_data)
#     if user_serializer.is_valid():
#         user_serializer.save()
#         return JsonResponse(user_serializer.data, status=status.HTTP_200_OK)
#     return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['DELETE'])
# def user_delete(request, pk):
#     user = User.objects.get(pk=pk)
#     user.delete()
#     return JsonResponse({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def user_login(request):
    user_data = JSONParser().parse(request)
    username = user_data["username"]
    password = user_data["password"]
    #print(password)
    user = authenticate(username=username, password=password)
    # user_serializer = UserSerializer(data=user_data, many=False)
    if user is None:
        print("------")
        return JsonResponse({'error': "not able to login"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        print(user)
        login(request, user)
        return JsonResponse({"message": "Logged in successfully"}, status=status.HTTP_200_OK)


def user_logout(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)
    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username, 'role': request.user.role, })


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
