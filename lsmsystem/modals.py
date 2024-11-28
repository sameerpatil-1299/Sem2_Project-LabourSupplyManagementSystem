from django.db import models

class saveregistrationdata(models.Model):
    email =models.CharField(max_length=30,default='emailid')
    mobile =models.CharField(max_length=30,default='1234567890')
    address =models.CharField(max_length=30,default='currentAddress')
    password =models.CharField(max_length=30,default='Sameer@1')
    repeatpassword=models.CharField(max_length=30,default='Sameer@1')
    timezone = models.CharField(max_length=10,default='UTC')

    def __str__(self):
        return self.email
        