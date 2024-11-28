from telnetlib import AUTHENTICATION
from django.http import HttpResponse
from django.shortcuts import render , redirect
from lsmsystem.modals import saveregistrationdata 
from django.contrib.auth import authenticate, login as auth_login

def Home(request):
    return render(request, 'website.html')

def Register(request):
    if request.method == 'POST':
        return redirect ('website')
    return render(request, 'register.html')

def SaveRegistrationForm(request):
    #Flow:Registeration>>> Views-SaveRegistrationForm - en=saveregistrationdata >>> Modals--saveregi..
    if request.method == 'POST':
        email=request.POST.get('email')
        mobile=request.POST.get('MobNo')
        address=request.POST.get('ResAdd')
        password=request.POST.get('psw')
        repeatpassword=request.POST.get('psw-repeat')
        form=saveregistrationdata(email=email,mobile=mobile,address=address,password=password,repeatpassword=repeatpassword)
        form.save()
    return render(request,'login.html')

def Login(request):
    return render(request,'login.html')

def Loggedin(request):
    if request.method == 'POST':
          email=request.POST.get('email')
          password=request.POST.get('psw')
          user=authenticate(email)
          if user is not None:
              auth_login.login(request,email)
              
              return render(request,'applyjobs.html')
          return redirect('applyjobs.html')
    return render(request,'applyjobs.html')

def ApplyJobs(request):
    return render(request,'applyjobs.html')

