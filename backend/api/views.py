from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login, logout

from rest_framework.authtoken.models import Token
from rest_framework import status

from base.models import candidateInfo
from .serializers import candidateInfoSerializer, UserSerializer
from base.generate import coverLetterGenerator

@api_view(['GET'])
def getData(request):
    candidates = candidateInfo.objects.all()
    serializer = candidateInfoSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def generateCoverLetter(request):
    coverLetter = coverLetterGenerator(request.data)
    # if request.user.is_authenticated:
    #     accountJson = getProfileFromUserAccount(request.user.email, request.data["url"])
    #     coverLetter = coverLetterGenerator(accountJson)
    # else:
    #     coverLetter = coverLetterGenerator(request.data)
    return Response({"data":coverLetter})

def getProfileFromUserAccount(email, url):
    try:
        userProfile = User.objects.get(email=email).profile
    except BaseException as e:
        raise ValidationError({"400": f'{str(e)}'})
    profile = {}
    profile["url"] = url
    profile["name"] = userProfile.name
    profile["gradeLevel"] = userProfile.schoolYear
    profile["major"] = userProfile.major
    profile["skills"] = userProfile.skills
    profile["experiences"] = userProfile.experiences
    return profile

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidateInfo(request, id):
    userProfile = User.objects.get(id=id).profile
    serializer = candidateInfoSerializer(userProfile, many=False)
    return Response(serializer.data)  

@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            token = Token.objects.create(user=user)
            json = serializer.data
            json['token'] = token.key
            return Response(json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    email = request.data['email']
    password = request.data['password']
    try:
        Account = User.objects.get(email=email)
    except BaseException as e:
        raise ValidationError({"400": f'{str(e)}'})
    token = Token.objects.get_or_create(user=Account)[0].key
    if not check_password(password, Account.password):
        raise ValidationError({"message": "Incorrect Login credentials"})
    if Account:
        if Account.is_active:
            login(request, Account)
            serializer = UserSerializer(Account, many=False)
            json = serializer.data
            json["token"] = token
            return Response(json, status=status.HTTP_200_OK)
        else:
            raise ValidationError({"400": f'Account not active'})
    else:
            raise ValidationError({"400": f'Account doesnt exist'})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    request.user.auth_token.delete()
    logout(request)
    return Response('User Logged out successfully')

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAuthUserID(request):
    return Response({"ID": request.user.id})

@api_view(["GET"])
@permission_classes([AllowAny])
def getUserAuthStatus(request):
    return Response({"status": request.user.is_authenticated})