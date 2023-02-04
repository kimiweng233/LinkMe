from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from base.models import candidateInfo
from django.contrib.auth.models import User

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

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(max_length=32, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')