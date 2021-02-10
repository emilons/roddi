from django.db import models



class Estate(models.Model):
    name = models.CharField(max_length=50, unique=True)


    def __str__(self):
        return self.name


class User(models.Model):
    username = models.CharField(max_length=20,  unique=True)
    password = models.CharField(max_length=50)

    email = models.EmailField(max_length=100, unique=True)

    estates = models.ManyToManyField(Estate)






# Create your models here.
