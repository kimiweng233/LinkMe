from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import candidateInfo
from .serializers import candidateInfoSerializer, UserSerializer
from base.generate import coverLetterGenerator
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['GET'])
def getData(request):
    candidates = candidateInfo.objects.all()
    serializer = candidateInfoSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def generateCoverLetter(request):
    coverLetter = coverLetterGenerator(request.data)
    return Response({"testCoverLetter":coverLetter})

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

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def loginUser(request):
#     email = request.data['email']
#     password = request.data['password']
#     try:
#         Account = User.objects.get(Email_Address=email1)
