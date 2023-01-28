from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import candidateInfo
from .serializers import candidateInfoSerializer
from base.generate import coverLetterGenerator

@api_view(['GET'])
def getData(request):
    candidates = candidateInfo.objects.all()
    serializer = candidateInfoSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def generateCoverLetter(request):
    coverLetter = coverLetterGenerator(request.data)
    return Response({"testCoverLetter":coverLetter})