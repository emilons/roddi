from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Estate(models.Model):
    name = models.CharField(max_length=50, unique=True)
    status = models.BooleanField()


class Item(models.Model):
    name = models.CharField(max_length=55)
    estate = models.ForeignKey(Estate, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    donate = models.BooleanField(default=False)
    discard = models.BooleanField(default=False)
    wanted = models.BooleanField(default=False)
    wanted_level = models.IntegerField(null=True, blank=True)

   
    voters = models.ManyToManyField(User, blank=True)

    class Meta:
        unique_together = (('name', 'estate'),)





