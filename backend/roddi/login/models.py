from django.core.validators import RegexValidator
from django.db import models


# Create your models here.

class Estate(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name



class User(models.Model):
    username = models.CharField(max_length=20,  unique=True)
    password = models.CharField(max_length=55, validators=[
        RegexValidator(regex=r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d@#$]{6,12}$",
                       message="""Password must have at least one digit, 
                               one uppercase letter, one lowercase letter and one special character""")])

    email = models.EmailField(max_length=100, unique=True)

    estates = models.ManyToManyField(Estate)

    def __str__(self):
        return self.username






