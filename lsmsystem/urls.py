
from django.contrib import admin
from django.urls import include, path
from lsmsystem import views 
from .modals import saveregistrationdata

urlpatterns = [
    path('', views.Home, name='home'),
    path('register/', views.Register, name='register'),
    path('login/', views.Login, name='login'),
    path('saveregistrationform/', views.SaveRegistrationForm, name='saveregistrationform'),
    path('applyjobs/',views.ApplyJobs, name='applyjobs'),
    path('admin/', admin.site.urls)
    
]



