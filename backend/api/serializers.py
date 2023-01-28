from rest_framework import serializers
from base.models import candidateInfo

class JSONSerializerField(serializers.Field):
    def to_internal_value(self, data):
        return data
    def to_representation(self, value):
        return value

class candidateInfoSerializer(serializers.ModelSerializer):
    skills = JSONSerializerField()
    experiences = JSONSerializerField()

    class Meta:
        model = candidateInfo
        fields = ('name', 'schoolYear', 'major', 'skills', 'experiences')