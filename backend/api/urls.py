from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('createUser/', views.createUser, name='createUser'),
    path('loginUser/', views.loginUser, name='loginUser'),
    path('logoutUser/', views.logoutUser, name='logoutUser'),
    path('getCandidateInfo/<str:id>/', views.getCandidateInfo, name='getCandidateInfo'),
    path('getAuthUserID/', views.getAuthUserID, name='getAuthUserID'),
    path('generateCoverLetter/', views.generateCoverLetter),
]