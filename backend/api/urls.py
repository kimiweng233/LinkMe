from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('createUser/', views.createUser, name='createUser'),
    path('generateCoverLetter/', views.generateCoverLetter),
]